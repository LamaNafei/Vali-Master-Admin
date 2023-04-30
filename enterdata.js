hashPassword = await bcrypt.hash("12345789", 10)
    let newAdmin = new Admin({
      userID: 1,
      firstName: "lama",
      lastName: "Moh",
      email: "lama.nafei@gmail.com",
      userName: "la.mn",
      password: hashPassword,
      statues: 1,
      mobileNo: "0599957822",
      gender: 2,
  });
  newAdmin.save();