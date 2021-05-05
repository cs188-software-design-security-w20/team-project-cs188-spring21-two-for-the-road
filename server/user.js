class User{
  constructor(firstName, lastName, email, profileImage) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.profileImage = profileImage;
  }

  get name(){
    return this.firstName + this.lastName;
  }
}

class Student extends User{
  constructor(firstName, lastName, email, sid, year, major, minor, club, honorStudent, resume, profileImage){
    super(firstName, lastName, email, profileImage);
    this.sid = sid;
    this.major = major;
    this.minor = minor;
    this.club = club;
    this.honorStudent = honorStudent;
    this.resume = resume;
  }
}

class Recruiter extends User{
  constructor(firstName, lastName, email, companyName, profileImage){
    super(firstName, lastName, email, profileImage);
    this.companyName = companyName;
  }
}
