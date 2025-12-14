import { useState } from "react";

const columns = ["All Tasks", "To-Do", "In-Progress", "Completed"];

export default function Dashboard({ setUser }) {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Low",
    status: "To-Do",
  });
  const [editTaskId, setEditTaskId] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);

  const addTask = () => {
    if (!form.title) return;

    if (editTaskId) {
      setTasks(
        tasks.map((task) =>
          task.id === editTaskId
            ? { ...form, id: editTaskId, date: task.date }
            : task
        )
      );
      setEditTaskId(null);
    } else {
      setTasks([
        ...tasks,
        {
          ...form,
          id: Date.now(),
          date: new Date().toLocaleDateString(), // ✅ DATE ADDED
        },
      ]);
    }

    setForm({ title: "", description: "", priority: "Low", status: "To-Do" });
    setShowModal(false);
  };

  const editTask = (task) => {
    setForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
    });
    setEditTaskId(task.id);
    setShowModal(true);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const onDragStart = (task) => {
    setDraggedTask(task);
  };

  const onDrop = (status) => {
    if (!draggedTask || status === "All Tasks") return;

    setTasks(
      tasks.map((task) =>
        task.id === draggedTask.id ? { ...task, status } : task
      )
    );
    setDraggedTask(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      {/* Navbar */}
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">Task Manager</h1>
        <div className="space-x-2">
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded"
          >
            + Add Task
          </button>
          <button
            onClick={() => setUser(null)}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Boards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {columns.map((col) => (
          <div
            key={col}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop(col)}
            className="bg-white rounded-xl shadow-lg p-4 min-h-[300px]"
          >
            <h2 className="font-semibold mb-4 text-indigo-600">{col}</h2>

            {tasks
              .filter((t) => (col === "All Tasks" ? true : t.status === col))
              .map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={() => onDragStart(task)}
                  className="bg-gray-50 border rounded-lg p-3 mb-3 cursor-move"
                >
                  <h3 className="font-bold">{task.title}</h3>
                  <p className="text-sm text-gray-600">{task.description}</p>

                  {/* ✅ DATE DISPLAY */}
                  <p className="text-xs text-gray-500 mt-1">
                    Created: {task.date}
                  </p>

                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-indigo-600">
                      {task.priority}
                    </span>
                    <span className="text-xs text-gray-500">
                      {task.status}
                    </span>
                  </div>

                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => editTask(task)}
                      className="bg-yellow-400 text-white px-2 py-1 rounded text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80">
            <h2 className="text-lg font-bold mb-3 text-indigo-600">
              {editTaskId ? "Edit Task" : "Add Task"}
            </h2>

            <input
              className="border p-2 w-full mb-2 rounded"
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <textarea
              className="border p-2 w-full mb-2 rounded"
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <select
              className="border p-2 w-full mb-2 rounded"
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value })
              }
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <select
              className="border p-2 w-full mb-3 rounded"
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
            >
              <option>To-Do</option>
              <option>In-Progress</option>
              <option>Completed</option>
            </select>

            <button
              onClick={addTask}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded w-full"
            >
              {editTaskId ? "Update" : "Add"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
