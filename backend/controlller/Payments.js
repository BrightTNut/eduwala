import { razorpay } from "../config/payment.js";

import Course from "../models/Course.js";

import User from "../models/User.js";

import mailSender from "../utils/mailSender.js";

//import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";

export const createPaymentt = async (req, res) => {
  const { course_id } = req.body;
  const userId = req.user.id;
  if (!course_id) {
    return res.status(401).json({
      success: false,
      message: "Please Provide valid course ID!!",
    });
  }
  let course;
  try {
    course = await Course.findById(course_id);
    if (!course) {
      return res.status(401).json({
        success: false,
        message: "Course not Found!!",
      });
    }
    const uid = new mongoose.Types.ObjectId(userId);
    if (course.studentEnrolled.include(uid)) {
      return res.status(401).json({
        success: false,
        message: "Course Already Purched!!",
      });
    }
  } catch (error) {
    console.loig(error);
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Error During Payment Initiation!!!",
    });
  }

  const amount = course.price;
  const currency = "INR";
  const options = {
    amount: amount * 100,
    currency,
    receipt: Math.random(Date.now()),
    notes: {
      courseId: course_id,
      userId,
    },
  };
  try {
    const order = await razorpay.orders.create(options);
    console.log(order);

    res.json({
      success: true,
      courseName: course.courseName,
      coureseDecription: course.coureseDecription,
      thumbnail: course.thumbnail,
      orderId: order.id,
    }); // Send order details to frontend, including order ID
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating order");
  }
};

export const verifySignature = async (req, res) => {
  const webhook = "12221";
  const signature = req.headers("x-razorpay-signature");
  const shasum = crypto.createHmac("sha256", webhook);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");
  if (signature === digest) {
    console.log(signature);
    const { courseId, userId } = req.body.payload.payment.entity.notes;

    try {
      //enrolled student
      const enrolledCourse = await Course.findByIdAndUpdate(
        { _id: courseId },
        {
          $push: { studentEnrolled: userId },
        },
        { new: true }
      );
      if (!enrolledCourse) {
        return res.status(402).json({
          success: false,
          message: "Error during adding student in Coures schema!!",
        });
      }
      const enrolledStudent = await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { courses: courseId } },
        { new: true }
      );
      if (!enrolledStudent) {
        return res.status(402).json({
          success: false,
          message: "Error during adding course in User schema!!",
        });
      }

      //mail send to student for conformation of course purched
      const mailSend = await mailSender(
        enrolledStudent.email,
        "Congratulation for Purcheaesd!!",
        "You one Step Compltet!!"
      );
      console.log(mailSend);
      return res.status(200).json({
        success: true,
        message: "Course Purched Successfully!!",
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: "error", message: "Error verifying payment" });
    }
  } else {
    return res.statu(400).json({
      success: false,
      messsage: "Signature not verifed!!!",
    });
  }
};
