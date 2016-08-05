// Implemented as an object.
var studentsObject = {
  "Dan" : ["Courtney", "Neil"],
  "Neil" : ["Emily", "Dan"],
  "Courtney" : ["Dan", "Pete"],
  "Emily" : ["Neil", "Mandy"],
  "Pete" : ["Mandy", "Courtney"],
  "Mandy" : ["Pete", "Emily"]
};
studentObject.generatePairs(); 
// [
//   ["Dan", "Mandy"], 
//   ["Neil", "Courtney"], 
//   ["Neil", "Courtney"], 
//   ["Emily","Pete"]
// ]

var PairGroup = function () {
  // Create storage object.
  this.cohort = {};
  
  // Adds a student to the cohort. 
  // Takes an optional argument for an array of past pairs.
  this.addStudent = function (studentName, studentPastPairs){
    
    // Initialize array of past pairs if none provided.
    studentPastPairs = studentPastPairs || [];
    
    // Create property.
    this.cohort.studentName = studentPastPairs;
    
    // Report back.
    console.log("Added " + studentName);
    console.log(this.cohort);
  };

  // Find the student by name and delete if found.
  this.removeStudent = function (name) {
    if (name in this.cohort) {
      delete this.cohort.name;
    }
  };
  
  // Return an array of student names.
  this.studentNames = function () {
    return Object.keys(this.cohort);
  };
  
  // Log out students in cohort to console.
  this.listStudents = function () {
    var names = this.studentNames();
    for (var i = 0; i < names.length; i++) {
      console.log(names[i]);
    }
  };

  // Returns a random student from the cohort.
  this.getRandomStudent = function () {
    // Get array of keys in students object.
    var keys = this.studentNames();
    var randomName = keys[ Math.floor(keys.length * Math.random()) ];
    return this.cohort[ keys[randomName] ];
  };

  // Randomly assign pairs and return an array of tuples.
  this.generatePairs = function () {
    var pairs = [];
    var studentsLeftToAssign = this.studentNames();
    var randomStudent;
    var idx;
    var studentPastPairs;
    var alreadyPaired;
    var oddStudent;

    // If we don't have any students, show error.
    if (!studentsLeftToAssign.length) {
      console.log("No students in this cohort. Add some with .addStudent()");
      return;
    // If we don't have at least two students, show error.
    } else if (studentsLeftToAssign.length < 2) {
      console.log("Not enough students. Add more with .addStudent()");
      return;
    // If we're going to have a student left over, put them in their own array and add as a 'pair' up front.
    } else if (studentsLeftToAssign.length % 2 !== 0) {
      oddStudent = [];
      oddStudent.push(studentsLeftToAssign.pop()); // TODO: This will always select the last student.
      pairs.push(oddStudent);
    }

    // For each student in the cohort...
    for (var currentStudent in this.cohort) { 
      // TODO: Can't we just iterate over studentsLeftToAssign and remove currentStudent from there when done? 
      // Else we have to figure out how to remove currentStudent from pairing options, before/after the pairing occurs.
      
      // As long as there are students unassigned...
      while (studentsLeftToAssign.length > 0) {
        
        // Get a random student.
        randomStudent = this.getRandomStudent();
        
        // Remove the student from studentsLeftToAssign.
        idx = studentsLeftToAssign.indexOf(randomStudent);
        studentsLeftToAssign.splice(idx, idx+1);
        
        // Iterate over this student's array of past pairs to check if currentStudent has already paired with randomStudent.
        studentPastPairs = this.cohort[currentStudent];
        alreadyPaired = false;
        for (var i = 0; i < studentPastPairs; i++) {
          if (studentPastPairs[i] === randomStudent) {
            alreadyPaired = true;
          }  
        }
        
        // If currentStudent and randomStudent are a new pair...
        if (!alreadyPaired) {
          
          // Add random student and this student to pairs.
          pairs.push(currentStudent, randomStudent);

          // Add randomStudent to currentStudent's pairs array.
          this.cohort[currentStudent] = randomStudent;
          
          // Add currentStudent to randomStudent's pairs array.         
          this.cohort[randomStudent] = currentStudent;
        }        
      }
      return pairs;
    }
  };
};

// Example usage:
var hrr20 = new PairGroup();
hrr20.addStudent("Neil");
hrr20.addStudent("Dan");
hrr20.addStudent("Courtney");
hrr20.addStudent("Emily");
hrr20.listStudents(); // ["Neil", "Dan", "Courtney", "Emily"]
hrr20.generatePairs(); // [["Neil", "Emily"], ["Dan", "Courtney"]]

// TODO
// Refactor addStudent() to accept any number of arguments so you don't have to add students one at a time.