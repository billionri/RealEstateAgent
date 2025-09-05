# RealEstateAgent
This a a real estate agent project to sell

Real Estate Project

This is a Full-Stack Real Estate Web Application built with:
	•	Backend: FastAPI, SQLAlchemy, SQLite
	•	Frontend: Next.js (React), Tailwind CSS
	•	Database: SQLite (with seed data)
	•	Payment Integration: Razorpay (dummy/demo integration)
	•	Features: User registration/login, property listing, property details, gallery & video, add to “My Properties”

Before running the project, make sure you have:
	1.	Node.js (v18+) & npm or yarn
	2.	Python 3.12+
	3.	Git
	4.	(Optional) VSCode or any IDE

 Step1.
git clone https://github.com/billionri/RealEstateAgent.git

Step 2: Setup Backend(run below command)
cd fastapi_real_estate
1. Create Python Virtual Environment(run below command)
python -m venv venv
	
now Activate Virtual Environment 
for windows(run below command)
venv\Scripts\activate
for mac(run below command)
source venv/bin/activate

Also Make Sure if u r in Vs code to Select Python Interperter Which is on your Virtual Machine if u dont have python
in your virtual machine install that also and update the pip. also(u can use chatgpt to resolve what things are not there in your project when u dont have installed things) 

Now install BackEnd Dependencies(run below command)
pip install fastapi uvicorn sqlalchemy python-multipart

than Run these to populate images and all(run below command)
python seed.py

last Step Now Run The BackEnd SErver(run below command)
uvicorn main:app --reload

Step 3: Setup Frontend

now open a new command prompt
and run (run below command)
npm install

and then(run below command)
npm run dev

the Above command will start the server at http://localhost:3000 

#### Video tutorial
https://www.loom.com/share/965dd5dd438e4ddd85fbcf9d1ec3d974?sid=41dacb57-fd1c-4eb4-bf8a-c7bb4ffe69a0


	
![Apis Screenshot](/API_ss.png)
