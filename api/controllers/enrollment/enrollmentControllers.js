import mongoose from "mongoose";
import Enrollment from "../../models/enrollment.model.js";
import Session from "../../models/session.model.js";

import crypto from "crypto";

const createSignature = (message) => {
  const secret = "8gBm/:&EnhH.1/q";
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(message);
  const hashInBase64 = hmac.digest("base64");
  return hashInBase64;
};

const createEnrollment = async (req, res) => {
  try {
    console.log(req.body);
    const enrollment = await Enrollment.create({
      sessionId: new mongoose.Types.ObjectId(req.body.sessionId),
      courseId: new mongoose.Types.ObjectId(req.body.courseId),
      studentId: new mongoose.Types.ObjectId(req.body.studentId),
      amount: req.body.amount,
    });

    console.log(`the newly created Enrollment ${enrollment}`);

    await Session.updateOne(
      {
        _id: new mongoose.Types.ObjectId(req.body.sessionId),
      },
      {
        $push: {
          participants: {
            studentId: new mongoose.Types.ObjectId(req.body.studentId),
            status: "enrolled",
          },
        },
      }
    );

    const signature = createSignature(
      `total_amount=${enrollment.amount},transaction_uuid=${enrollment._id},product_code=EPAYTEST`
    );

    const formData = {
      amount: enrollment.amount,
      failure_url: "http://localhost:5173/student/dashboard/esewa_failure",
      product_delivery_charge: "0",
      product_service_charge: "0",
      product_code: "EPAYTEST",
      signature: signature,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      success_url: "http://localhost:3000/enrollment/handle-success-esewa",
      tax_amount: "0",
      total_amount: enrollment.amount,
      transaction_uuid: enrollment._id,
    };
    res.json({
      success: true,
      message: "Enrollment created Successfully",
      enrollment,
      formData,
    });
  } catch (error) {
    console.log(error);
  }
};

const handleSuccessEsewa = async (req, res, next) => {
  try {
    const { data } = req.query;
    const decodedData = JSON.parse(
      Buffer.from(data, "base64").toString("utf-8")
    );
    console.log(decodedData);
    if (decodedData.status !== "COMPLETE") {
      return res.json({
        message: "Transaction not successful",
      });
    }

    // const message = decodedData.signed_field_names
    //   .split(",")
    //   .map((field) => `${field}=${decodedData[field] || ""}`)
    //   .join(",");
    // console.log(message);
    // const signature = createSignature(message);
    // if (signature !== decodedData.transaction_uuid) {
    //   return res.json({
    //     message: "Integrity issue",
    //   });
    // }

    req.transaction_uuid = decodedData.transaction_uuid;
    req.transaction_code = decodedData.transaction_code;
    next();
  } catch (error) {
    console.log(error);
    res.json({ message: "Something went wrong" || "No orders found" });
  }
};

const updateEnrollmentStatus = async (req, res) => {
  try {
    await Enrollment.updateOne(
      { _id: req.transaction_uuid },
      {
        $set: {
          status: "completed",
        },
      }
    );
    res.redirect("http://localhost:5173/student/dashboard");
  } catch (error) {
    console.log(error);
    res.json({ message: "Something went wrong" || "No orders found" });
  }
};

export { createEnrollment, handleSuccessEsewa, updateEnrollmentStatus };
