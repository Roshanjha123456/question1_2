import { dbName, client } from "../server.js";
import md5 from "md5";
import { usersData } from "./data.js";

export const inserUsers = async (req, res) => {
  try {
    const usersCollection = client.db(dbName).collection("users");
    const insertedUsers = await usersCollection.insertMany(
      usersData.map((user) => ({
        ...user,
        password: md5(user.password),
      }))
    );

    const usersProfileData = [
      {
        user_id: insertedUsers.insertedIds[0],
        dob: "1990-01-01",
        mobile_no: "1234567890",
      },
      {
        user_id: insertedUsers.insertedIds[1],
        dob: "1985-05-15",
        mobile_no: "9876543210",
      },
      {
        user_id: insertedUsers.insertedIds[2],
        dob: "1990-01-01",
        mobile_no: "1234567890",
      },
      {
        user_id: insertedUsers.insertedIds[3],
        dob: "1985-05-15",
        mobile_no: "9876543210",
      },
      {
        user_id: insertedUsers.insertedIds[4],
        dob: "1990-01-01",
        mobile_no: "1234567890",
      },
    ];

    const userProfileCollection = client.db(dbName).collection("usersProfile");
    await userProfileCollection.insertMany(usersProfileData);

    res.status(201).json({
      success: true,
      message: "Users Added Successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const avergeAge = async (req, res) => {
  const userProfileCollection = client.db(dbName).collection("usersProfile");

  try {
    const userProfile = await userProfileCollection.find().toArray();

    const totalAges = userProfile.reduce((sum, profile) => {
      const dob = new Date(profile.dob);
      const age = new Date().getFullYear() - dob.getFullYear();
      return sum + age;
    }, 0);
    const ageCalculate = totalAges / userProfile.length;
    res.status(201).json({
      success: true,
      ageCalculate,
    });
  } catch (error) {}
};
