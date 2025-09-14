from flask import Flask, jsonify, request, render_template
import json

"""
👆
=> imports Flask and tools:
a) Flask → to create the web app.
b) jsonify → converts Python objects into JSON responses (so the browser/Postman can read them).
c) request → lets you get data sent from the client (like JSON from Postman).
d) import json → used for working with JSON files (reading/writing db.json).
e) render_template connects your Python code (Flask) with your HTML files so you can build web pages with dynamic content.
"""

app = Flask(__name__)
"""
👆
- Creates a Flask application object named app.
- __name__ tells Flask where your app is defined (needed for configuration and routes).
"""


# file = open("db.json", "r")
# print(file.read())
# file.close()
# 👆 Instead of this code, use this 👇
def getAllToDos():
    with open("db.json") as file:
        # return file.read()
        return json.load(file)


# With with keyword file closes automatically!
"""
👆
with open("db.json") as file:
- open("db.json") → opens the file named db.json (a JSON file in your folder).
- with ... as file: → this is called a context manager.
- It automatically opens the file.
- And when the block ends, it closes the file (so you don't need file.close() manually).
- Here, file becomes the file object you can use.
"""
"""
👆
- Opens the db.json file.
- json.load(file) reads the JSON content and converts it into a Python list/dictionary.
- This function is used whenever you want to read all To-Dos.
"""


def addToDo(data):
    with open("db.json", "+w") as file:
        json.dump(data, file, indent=4)


"""
👆
- Opens db.json in write mode (+w → creates file if it doesn't exist, allows writing).
- json.dump(data, file, indent=4) → writes the Python object (data) into the file as JSON, formatted with indentation for readability.
"""


@app.route("/")
def home():
    return render_template("index.html")


# 👆 Instead of returning plain text, this tells Flask: “Find a file called index.html inside the templates/ folder and send it to the browser.” So the browser displays the HTML page.

# 👆 When you visit / in the browser → returns a welcome message.


@app.route("/create", methods=["POST"])
def createToDo():
    body = request.json
    # print(body)
    data = getAllToDos()
    test = {"id": len(data) + 1, "task": body["task"]}
    data.append(test)
    addToDo(data)
    return "To - Do Created Successfully!"


"""
👆
a) methods=["POST"] → this route only works when you send a POST request (not GET).
b) body = request.json → gets the JSON data sent in the request (your new To-Do).
c) data = getAllToDos() → loads existing To-Dos from db.json.
d) data.append(body) → adds the new To-Do to the list.
e) addToDo(data) → saves the updated list back to the file.
f) Returns success message.
"""


@app.route("/read", methods=["GET"])
def readToDo():
    data = getAllToDos()
    # print(type(data)) => <class 'str'>
    # return data
    return jsonify(data)


"""
👆
a) methods=["GET"] → works with GET requests.
b) data = getAllToDos() → gets all To-Dos from db.json.
c) jsonify(data) → sends back the list as JSON (so Postman/browser can understand).
"""


@app.route("/update/<int:tid>", methods=["PUT"])
# 👆 This makes an API endpoint /update/some_id that works with the PUT method. The <int:tid> means we pass a number (task id) in the URL.
def updateToDo(tid):
    # 👆 Defines a function that takes the tid (task id from the URL).
    data = request.json
    # 👆 Has the data which we give from the postman, body => raw => which should be json(checked)
    # 👆 Gets the data we send from Postman (Body → raw → JSON). Example: { "task": "New Task Name" }.
    # print(tid)
    # print(data)
    allToDos = getAllToDos()
    todos = []  # Creates an empty list to store updated tasks.
    for item in allToDos:
        if item["id"] == tid:
            item["task"] = data["task"]
        todos.append(item)
    addToDo(todos)
    return "To - Do Updated Successfully!"


@app.route("/delete/<int:tid>", methods=["DELETE"])
# 👆 Creates an API endpoint /delete/some_id that works with the DELETE method <int:tid> means we pass the task id (a number) in the URL.
def deleteToDo(tid):
    # 👆 Defines a function that takes the tid (task id to delete).
    # print(tid)
    data = getAllToDos()
    todos = []
    # 👆 Makes an empty list where we will store tasks after deleting the one we don’t need.
    for item in data:
        if item["id"] != tid:
            todos.append(item)
    addToDo(todos)
    return "To - Do Deleted Successfully!"


if __name__ == "__main__":
    app.run(debug=True)
"""
👆
- Ensures the app runs only if this file is executed directly (not imported).
- app.run(debug=True) → starts Flask server with debug mode:
a) Auto-reloads when you save changes.
b) Shows detailed error messages in the browser.
"""

"""
=> Four Methods:
POST → Create
GET → Read
PUT → Update
DELETE → Delete
CRUD => Create Read Update Delete
"""
