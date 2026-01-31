-- School Database Schema and Seed Data
-- Educational database for learning SQL
-- Covers course goals: 1, 5, 7, 10, 12

-- Students table
CREATE TABLE students (
    student_id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    date_of_birth TEXT,
    enrollment_date TEXT NOT NULL,
    program_id INTEGER,
    FOREIGN KEY (program_id) REFERENCES programs(program_id)
);

-- Teachers table
CREATE TABLE teachers (
    teacher_id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    department TEXT,
    hire_date TEXT NOT NULL,
    salary REAL
);

-- Programs table
CREATE TABLE programs (
    program_id INTEGER PRIMARY KEY,
    program_name TEXT NOT NULL,
    department TEXT NOT NULL,
    duration_years INTEGER,
    description TEXT
);

-- Courses table
CREATE TABLE courses (
    course_id INTEGER PRIMARY KEY,
    course_code TEXT UNIQUE NOT NULL,
    course_name TEXT NOT NULL,
    credits INTEGER NOT NULL CHECK (credits > 0),
    teacher_id INTEGER,
    program_id INTEGER,
    max_students INTEGER DEFAULT 30,
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id),
    FOREIGN KEY (program_id) REFERENCES programs(program_id)
);

-- Enrollments table (many-to-many between students and courses)
CREATE TABLE enrollments (
    enrollment_id INTEGER PRIMARY KEY,
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    enrollment_date TEXT NOT NULL,
    grade TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dropped', 'withdrawn')),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id),
    UNIQUE (student_id, course_id)
);

-- Grades table for detailed grade tracking
CREATE TABLE grades (
    grade_id INTEGER PRIMARY KEY,
    enrollment_id INTEGER NOT NULL,
    assignment_name TEXT NOT NULL,
    score REAL CHECK (score >= 0 AND score <= 100),
    max_score REAL DEFAULT 100,
    submission_date TEXT,
    FOREIGN KEY (enrollment_id) REFERENCES enrollments(enrollment_id)
);

-- Classrooms table
CREATE TABLE classrooms (
    room_id INTEGER PRIMARY KEY,
    room_number TEXT UNIQUE NOT NULL,
    building TEXT NOT NULL,
    capacity INTEGER NOT NULL,
    equipment TEXT
);

-- Schedule table
CREATE TABLE schedule (
    schedule_id INTEGER PRIMARY KEY,
    course_id INTEGER NOT NULL,
    room_id INTEGER NOT NULL,
    day_of_week TEXT NOT NULL CHECK (day_of_week IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday')),
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(course_id),
    FOREIGN KEY (room_id) REFERENCES classrooms(room_id)
);

-- Insert programs
INSERT INTO programs (program_name, department, duration_years, description) VALUES
    ('Computer Science', 'Technology', 3, 'Bachelor program in computer science and software development'),
    ('Data Science', 'Technology', 2, 'Master program in data analytics and machine learning'),
    ('Web Development', 'Technology', 2, 'Practical program in modern web technologies'),
    ('Database Administration', 'Technology', 2, 'Specialized program in database management'),
    ('Network Engineering', 'Technology', 3, 'Program focusing on network infrastructure'),
    ('Cybersecurity', 'Technology', 2, 'Program in information security and ethical hacking'),
    ('Business Administration', 'Business', 3, 'Bachelor program in business management'),
    ('Digital Marketing', 'Business', 2, 'Program in online marketing and analytics');

-- Insert teachers
INSERT INTO teachers (first_name, last_name, email, department, hire_date, salary) VALUES
    ('Anna', 'Lindqvist', 'anna.lindqvist@school.se', 'IT', '2018-08-15', 52000),
    ('Erik', 'Bergström', 'erik.bergstrom@school.se', 'IT', '2016-01-10', 58000),
    ('Maria', 'Johansson', 'maria.johansson@school.se', 'IT', '2019-08-20', 48000),
    ('Johan', 'Andersson', 'johan.andersson@school.se', 'IT', '2017-03-01', 55000),
    ('Sofia', 'Nilsson', 'sofia.nilsson@school.se', 'Business', '2020-01-15', 45000),
    ('Peter', 'Svensson', 'peter.svensson@school.se', 'Technology', '2015-09-01', 62000),
    ('Lisa', 'Karlsson', 'lisa.karlsson@school.se', 'Business', '2021-08-15', 43000),
    ('Anders', 'Holm', 'anders.holm@school.se', 'Technology', '2019-01-10', 50000);

-- Insert courses
INSERT INTO courses (course_code, course_name, credits, teacher_id, program_id, max_students) VALUES
    ('CS101', 'Introduction to Programming', 7.5, 1, 1, 35),
    ('CS102', 'Data Structures and Algorithms', 7.5, 2, 1, 30),
    ('CS103', 'Object-Oriented Programming', 7.5, 1, 1, 30),
    ('DB101', 'Database Fundamentals', 7.5, 4, 4, 25),
    ('DB102', 'Advanced SQL', 7.5, 4, 4, 25),
    ('DB103', 'Database Design and Normalization', 7.5, 4, 4, 25),
    ('WEB101', 'HTML and CSS Fundamentals', 7.5, 3, 3, 30),
    ('WEB102', 'JavaScript Programming', 7.5, 3, 3, 30),
    ('WEB103', 'React Development', 7.5, 3, 3, 25),
    ('DS101', 'Introduction to Data Science', 7.5, 2, 2, 25),
    ('DS102', 'Machine Learning Basics', 7.5, 2, 2, 25),
    ('DS103', 'Data Visualization', 7.5, 8, 2, 30),
    ('NET101', 'Network Fundamentals', 7.5, 6, 5, 30),
    ('NET102', 'Network Security', 7.5, 6, 5, 25),
    ('SEC101', 'Cybersecurity Fundamentals', 7.5, 6, 6, 30),
    ('SEC102', 'Ethical Hacking', 7.5, 6, 6, 20),
    ('BUS101', 'Business Administration', 7.5, 5, 7, 40),
    ('BUS102', 'Project Management', 7.5, 5, 7, 35),
    ('MKT101', 'Digital Marketing Fundamentals', 7.5, 7, 8, 35),
    ('MKT102', 'Social Media Marketing', 7.5, 7, 8, 30);

-- Insert students
INSERT INTO students (first_name, last_name, email, date_of_birth, enrollment_date, program_id) VALUES
    ('Emma', 'Lindgren', 'emma.lindgren@student.se', '2000-03-15', '2023-08-28', 1),
    ('Oscar', 'Eriksson', 'oscar.eriksson@student.se', '2001-07-22', '2023-08-28', 1),
    ('Alice', 'Persson', 'alice.persson@student.se', '2000-11-08', '2023-08-28', 2),
    ('William', 'Svensson', 'william.svensson@student.se', '1999-05-30', '2022-08-29', 3),
    ('Ella', 'Gustafsson', 'ella.gustafsson@student.se', '2001-09-14', '2023-08-28', 4),
    ('Lucas', 'Pettersson', 'lucas.pettersson@student.se', '2000-01-25', '2022-08-29', 1),
    ('Maja', 'Jonsson', 'maja.jonsson@student.se', '2001-04-18', '2023-08-28', 5),
    ('Liam', 'Larsson', 'liam.larsson@student.se', '1999-12-03', '2022-08-29', 2),
    ('Wilma', 'Olsson', 'wilma.olsson@student.se', '2000-06-11', '2023-08-28', 6),
    ('Hugo', 'Karlsson', 'hugo.karlsson@student.se', '2001-02-28', '2023-08-28', 3),
    ('Saga', 'Nilsson', 'saga.nilsson@student.se', '2000-08-07', '2022-08-29', 4),
    ('Oliver', 'Andersson', 'oliver.andersson@student.se', '1999-10-19', '2022-08-29', 7),
    ('Ebba', 'Johansson', 'ebba.johansson@student.se', '2001-01-31', '2023-08-28', 8),
    ('Elias', 'Berg', 'elias.berg@student.se', '2000-07-14', '2023-08-28', 1),
    ('Astrid', 'Lindberg', 'astrid.lindberg@student.se', '2001-05-09', '2023-08-28', 2),
    ('Leo', 'Sandberg', 'leo.sandberg@student.se', '1999-11-22', '2022-08-29', 5),
    ('Freja', 'Eklund', 'freja.eklund@student.se', '2000-04-05', '2023-08-28', 6),
    ('Noah', 'Holmberg', 'noah.holmberg@student.se', '2001-08-17', '2023-08-28', 3),
    ('Vera', 'Nyström', 'vera.nystrom@student.se', '2000-02-14', '2022-08-29', 7),
    ('Adam', 'Fransson', 'adam.fransson@student.se', '1999-09-26', '2022-08-29', 8),
    ('Alma', 'Lundgren', 'alma.lundgren@student.se', '2001-06-03', '2023-08-28', 1),
    ('Filip', 'Wallin', 'filip.wallin@student.se', '2000-12-10', '2023-08-28', 4),
    ('Selma', 'Engström', 'selma.engstrom@student.se', '2001-03-27', '2023-08-28', 2),
    ('Axel', 'Forsberg', 'axel.forsberg@student.se', '1999-08-08', '2022-08-29', 6),
    ('Nora', 'Magnusson', 'nora.magnusson@student.se', '2000-10-21', '2023-08-28', 5);

-- Insert classrooms
INSERT INTO classrooms (room_number, building, capacity, equipment) VALUES
    ('A101', 'Main Building', 35, 'Projector, Whiteboard, Computer'),
    ('A102', 'Main Building', 30, 'Projector, Whiteboard'),
    ('A201', 'Main Building', 40, 'Projector, Whiteboard, Computer'),
    ('B101', 'Tech Center', 25, 'Computers for all students, Projector'),
    ('B102', 'Tech Center', 25, 'Computers for all students, Projector'),
    ('B201', 'Tech Center', 30, 'Computers for all students, Whiteboard'),
    ('C101', 'Business Wing', 40, 'Projector, Whiteboard'),
    ('C102', 'Business Wing', 35, 'Projector, Whiteboard, Video Conference');

-- Insert enrollments
INSERT INTO enrollments (student_id, course_id, enrollment_date, grade, status) VALUES
    (1, 1, '2023-08-28', 'A', 'completed'),
    (1, 2, '2023-08-28', 'B', 'completed'),
    (1, 3, '2024-01-15', NULL, 'active'),
    (2, 1, '2023-08-28', 'B', 'completed'),
    (2, 2, '2023-08-28', 'C', 'completed'),
    (2, 3, '2024-01-15', NULL, 'active'),
    (3, 10, '2023-08-28', 'A', 'completed'),
    (3, 11, '2024-01-15', NULL, 'active'),
    (4, 7, '2022-08-29', 'A', 'completed'),
    (4, 8, '2022-08-29', 'A', 'completed'),
    (4, 9, '2023-08-28', 'B', 'completed'),
    (5, 4, '2023-08-28', 'A', 'completed'),
    (5, 5, '2024-01-15', NULL, 'active'),
    (6, 1, '2022-08-29', 'B', 'completed'),
    (6, 2, '2022-08-29', 'B', 'completed'),
    (6, 3, '2023-01-16', 'A', 'completed'),
    (7, 13, '2023-08-28', 'B', 'completed'),
    (7, 14, '2024-01-15', NULL, 'active'),
    (8, 10, '2022-08-29', 'A', 'completed'),
    (8, 11, '2023-01-16', 'A', 'completed'),
    (8, 12, '2023-08-28', 'A', 'completed'),
    (9, 15, '2023-08-28', 'B', 'completed'),
    (9, 16, '2024-01-15', NULL, 'active'),
    (10, 7, '2023-08-28', 'C', 'completed'),
    (10, 8, '2024-01-15', NULL, 'active'),
    (11, 4, '2022-08-29', 'A', 'completed'),
    (11, 5, '2023-01-16', 'A', 'completed'),
    (11, 6, '2023-08-28', 'B', 'completed'),
    (12, 17, '2022-08-29', 'B', 'completed'),
    (12, 18, '2023-01-16', 'A', 'completed'),
    (13, 19, '2023-08-28', 'A', 'completed'),
    (13, 20, '2024-01-15', NULL, 'active'),
    (14, 1, '2023-08-28', 'A', 'completed'),
    (14, 2, '2023-08-28', 'A', 'completed'),
    (15, 10, '2023-08-28', 'B', 'completed'),
    (15, 11, '2024-01-15', NULL, 'active'),
    (16, 13, '2022-08-29', 'A', 'completed'),
    (16, 14, '2023-01-16', 'A', 'completed'),
    (17, 15, '2023-08-28', 'A', 'completed'),
    (17, 16, '2024-01-15', NULL, 'active'),
    (18, 7, '2023-08-28', 'B', 'completed'),
    (18, 8, '2024-01-15', NULL, 'active'),
    (19, 17, '2022-08-29', 'C', 'completed'),
    (19, 18, '2023-01-16', 'B', 'completed'),
    (20, 19, '2022-08-29', 'A', 'completed'),
    (20, 20, '2023-01-16', 'A', 'completed'),
    (21, 1, '2023-08-28', 'B', 'completed'),
    (21, 2, '2023-08-28', NULL, 'active'),
    (22, 4, '2023-08-28', 'A', 'completed'),
    (22, 5, '2024-01-15', NULL, 'active'),
    (23, 10, '2023-08-28', 'A', 'completed'),
    (23, 11, '2024-01-15', NULL, 'active'),
    (24, 15, '2022-08-29', 'A', 'completed'),
    (24, 16, '2023-01-16', 'A', 'completed'),
    (25, 13, '2023-08-28', 'B', 'completed'),
    (25, 14, '2024-01-15', NULL, 'active');

-- Insert grades for completed enrollments
INSERT INTO grades (enrollment_id, assignment_name, score, max_score, submission_date) VALUES
    (1, 'Programming Assignment 1', 92, 100, '2023-09-15'),
    (1, 'Programming Assignment 2', 88, 100, '2023-10-01'),
    (1, 'Midterm Exam', 85, 100, '2023-10-20'),
    (1, 'Final Project', 95, 100, '2023-12-15'),
    (2, 'Data Structures Lab 1', 78, 100, '2023-09-20'),
    (2, 'Data Structures Lab 2', 82, 100, '2023-10-10'),
    (2, 'Algorithm Analysis', 75, 100, '2023-11-01'),
    (4, 'Programming Assignment 1', 85, 100, '2023-09-15'),
    (4, 'Programming Assignment 2', 80, 100, '2023-10-01'),
    (4, 'Final Project', 78, 100, '2023-12-15'),
    (7, 'Data Analysis Project', 95, 100, '2023-10-15'),
    (7, 'Statistics Exam', 92, 100, '2023-11-20'),
    (9, 'HTML Portfolio', 98, 100, '2022-10-01'),
    (9, 'CSS Styling Project', 95, 100, '2022-11-15'),
    (10, 'JavaScript Basics', 96, 100, '2022-10-20'),
    (10, 'DOM Manipulation', 94, 100, '2022-12-01'),
    (12, 'Database Design', 95, 100, '2023-10-10'),
    (12, 'SQL Queries Assignment', 98, 100, '2023-11-05'),
    (12, 'Normalization Exercise', 92, 100, '2023-12-01');

-- Insert schedule
INSERT INTO schedule (course_id, room_id, day_of_week, start_time, end_time) VALUES
    (1, 4, 'Monday', '09:00', '12:00'),
    (1, 4, 'Wednesday', '09:00', '12:00'),
    (2, 4, 'Tuesday', '13:00', '16:00'),
    (2, 5, 'Thursday', '13:00', '16:00'),
    (3, 5, 'Monday', '13:00', '16:00'),
    (3, 5, 'Friday', '09:00', '12:00'),
    (4, 4, 'Monday', '09:00', '12:00'),
    (4, 4, 'Thursday', '09:00', '12:00'),
    (5, 5, 'Tuesday', '09:00', '12:00'),
    (5, 5, 'Friday', '13:00', '16:00'),
    (6, 4, 'Wednesday', '13:00', '16:00'),
    (7, 6, 'Monday', '09:00', '12:00'),
    (7, 6, 'Wednesday', '09:00', '12:00'),
    (8, 6, 'Tuesday', '09:00', '12:00'),
    (8, 6, 'Thursday', '09:00', '12:00'),
    (9, 5, 'Wednesday', '13:00', '16:00'),
    (9, 5, 'Friday', '09:00', '12:00'),
    (10, 4, 'Tuesday', '09:00', '12:00'),
    (10, 4, 'Thursday', '09:00', '12:00'),
    (17, 7, 'Monday', '09:00', '12:00'),
    (17, 7, 'Wednesday', '09:00', '12:00'),
    (19, 8, 'Tuesday', '13:00', '16:00'),
    (19, 8, 'Thursday', '13:00', '16:00');

-- Create indexes
CREATE INDEX idx_students_program ON students(program_id);
CREATE INDEX idx_courses_teacher ON courses(teacher_id);
CREATE INDEX idx_courses_program ON courses(program_id);
CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_enrollments_course ON enrollments(course_id);
CREATE INDEX idx_grades_enrollment ON grades(enrollment_id);
CREATE INDEX idx_schedule_course ON schedule(course_id);
