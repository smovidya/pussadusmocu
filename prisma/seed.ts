import { PrismaClient } from "@prisma/client";

async function main() {
  const db = new PrismaClient();

  await db.$transaction(async (db) => {
    // Clear existing data
    await db.parcel_Project.deleteMany();
    await db.project_Student.deleteMany();
    await db.parcel.deleteMany();
    await db.project.deleteMany();
    await db.student.deleteMany();

    // Create Students
    const students = await Promise.all([
      db.student.create({
        data: {
          student_id: "9999999",
          department: "MATHCOM",
          email: "admin@g.com",
          line_id: "admin_line",
          isAdmin: true,
          name: "John Admin",
        }
      }),
      db.student.create({
        data: {
          student_id: "6430000021",
          department: "SMO",
          email: "alice@student.chula.ac.th",
          line_id: "alice_smo",
          isAdmin: false,
          name: "Alice Smith",
        }
      }),
      db.student.create({
        data: {
          student_id: "6430000022",
          department: "CHEM",
          email: "bob@student.chula.ac.th",
          line_id: "bob_chem",
          isAdmin: false,
          name: "Bob Johnson",
        }
      }),
      db.student.create({
        data: {
          student_id: "6430000023",
          department: "PHYSICS",
          email: "charlie@student.chula.ac.th",
          line_id: "charlie_physics",
          isAdmin: false,
          name: "Charlie Brown",
        }
      }),
      db.student.create({
        data: {
          student_id: "6430000024",
          department: "BIO",
          email: "diana@student.chula.ac.th",
          line_id: "diana_bio",
          isAdmin: false,
          name: "Diana Prince",
        }
      }),
    ]);

    // Create Projects
    const projects = await Promise.all([
      db.project.create({
        data: {
          title: "Science Fair 2025",
          status: "INPROGRESS",
          owner: "ACADEMIC",
          published: true,
        }
      }),
      db.project.create({
        data: {
          title: "Chemistry Lab Setup",
          status: "NOTSTART",
          owner: "ACADEMIC",
          published: false,
        }
      }),
      db.project.create({
        data: {
          title: "Student Sports Day",
          status: "EVALUATE",
          owner: "SPORT",
          published: true,
        }
      }),
      db.project.create({
        data: {
          title: "Environmental Research",
          status: "COMPLETE",
          owner: "SCIREN_CLUB",
          published: true,
        }
      }),
    ]);

    // Create Project-Student relationships
    await Promise.all([
      db.project_Student.create({
        data: {
          student_id: students[0].student_id,
          project_id: projects[0].project_id,
        }
      }),
      db.project_Student.create({
        data: {
          student_id: students[1].student_id,
          project_id: projects[0].project_id,
        }
      }),
      db.project_Student.create({
        data: {
          student_id: students[2].student_id,
          project_id: projects[1].project_id,
        }
      }),
      db.project_Student.create({
        data: {
          student_id: students[3].student_id,
          project_id: projects[2].project_id,
        }
      }),
      db.project_Student.create({
        data: {
          student_id: students[4].student_id,
          project_id: projects[3].project_id,
        }
      }),
    ]);

    // Create Parcels
    const parcels = await Promise.all([
      db.parcel.create({
        data: {
          title: "Laptop Computer",
          description: "Dell Latitude 5520 for academic use",
          amount: 5,
          available: true,
          unit: "เครื่อง",
          image_url: "/images/laptop.jpg",
          type: "DURABLE",
          group: "COMPUTER",
          department: "MATHCOM",
        }
      }),
      db.parcel.create({
        data: {
          title: "Microscope",
          description: "Professional lab microscope",
          amount: 3,
          available: true,
          unit: "เครื่อง",
          image_url: "/images/microscope.jpg",
          type: "DURABLE",
          group: "MEDICAL_SCI",
          department: "BIO",
        }
      }),
      db.parcel.create({
        data: {
          title: "Office Chairs",
          description: "Ergonomic office chairs",
          amount: 20,
          available: true,
          unit: "ตัว",
          image_url: "/images/chair.jpg",
          type: "NORMAL",
          group: "OFFICE",
        }
      }),
      db.parcel.create({
        data: {
          title: "Lab Key - Room 301",
          description: "Access key for chemistry lab room 301",
          amount: 2,
          available: true,
          unit: "ดอก",
          image_url: "/images/key.jpg",
          type: "KEY",
          group: "BUILDING",
          department: "CHEM",
        }
      }),
      db.parcel.create({
        data: {
          title: "Sound System",
          description: "Portable PA system for events",
          amount: 1,
          available: false,
          unit: "ชุด",
          image_url: "/images/sound_system.jpg",
          type: "DURABLE",
          group: "MUSICAL",
        }
      }),
      db.parcel.create({
        data: {
          title: "A4 Paper",
          description: "White copy paper 80gsm",
          amount: 50,
          available: true,
          unit: "รีม",
          image_url: "/images/paper.jpg",
          type: "NORMAL",
          group: "OFFICE",
        }
      }),
      db.parcel.create({
        data: {
          title: "Digital Camera",
          description: "Canon EOS R6 for documentation",
          amount: 2,
          available: true,
          unit: "เครื่อง",
          image_url: "/images/camera.jpg",
          type: "DURABLE",
          group: "ELECTRONIC",
        }
      }),
      db.parcel.create({
        data: {
          title: "Lab Coats",
          description: "White laboratory coats - Medium size",
          amount: 15,
          available: true,
          unit: "ตัว",
          image_url: "/images/labcoat.jpg",
          type: "NORMAL",
          group: "CLOTHING",
          department: "CHEM",
        }
      }),
    ]);

    // Create Parcel-Project relationships (borrowing records)
    await Promise.all([
      db.parcel_Project.create({
        data: {
          parcel_id: parcels[0].parcel_id,
          project_id: projects[0].project_id,
          student_id: students[1].student_id,
          description_admin: "Approved for science fair presentation setup",
          amount: 2,
          description: "Need laptops for interactive displays at science fair",
          status: "BORROWING",
          startDate: new Date("2025-06-15"),
          endDate: new Date("2025-06-25"),
        }
      }),
      db.parcel_Project.create({
        data: {
          parcel_id: parcels[1].parcel_id,
          project_id: projects[1].project_id,
          student_id: students[2].student_id,
          description_admin: "Pending lab supervisor approval",
          amount: 1,
          description: "Required for chemistry experiment setup",
          status: "PENDING",
          startDate: new Date("2025-06-20"),
          endDate: new Date("2025-07-20"),
        }
      }),
      db.parcel_Project.create({
        data: {
          parcel_id: parcels[2].parcel_id,
          project_id: projects[2].project_id,
          student_id: students[3].student_id,
          description_admin: "Currently in use for sports day setup",
          amount: 10,
          description: "Chairs needed for sports day judging panel",
          status: "INUSE",
          startDate: new Date("2025-06-10"),
          endDate: new Date("2025-06-30"),
        }
      }),
      db.parcel_Project.create({
        data: {
          parcel_id: parcels[4].parcel_id,
          project_id: projects[0].project_id,
          student_id: students[0].student_id,
          description_admin: "Equipment conflict with another event",
          amount: 1,
          description: "Sound system for science fair announcements",
          status: "REJECT",
          startDate: new Date("2025-06-15"),
          endDate: new Date("2025-06-25"),
        }
      }),
      db.parcel_Project.create({
        data: {
          parcel_id: parcels[6].parcel_id,
          project_id: projects[3].project_id,
          student_id: students[4].student_id,
          description_admin: "Successfully returned after project completion",
          amount: 1,
          description: "Documentation camera for environmental research",
          status: "RETURN",
          startDate: new Date("2025-05-01"),
          endDate: new Date("2025-06-01"),
        }
      }),
      db.parcel_Project.create({
        data: {
          parcel_id: parcels[5].parcel_id,
          project_id: projects[1].project_id,
          student_id: students[2].student_id,
          description_admin: "",
          amount: 5,
          description: "Paper needed for lab reports and documentation",
          status: "PENDING",
          startDate: new Date("2025-06-20"),
          endDate: new Date("2025-07-20"),
        }
      }),
    ]);

    console.log("✅ Database seeded successfully!");
    console.log(`Created ${students.length} students`);
    console.log(`Created ${projects.length} projects`);
    console.log(`Created ${parcels.length} parcels`);
    console.log("Created project-student and parcel-project relationships");
  });
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    const db = new PrismaClient();
    await db.$disconnect();
  });
