import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/tasks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch tasks');
        }

        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [navigate]);

  // Handle task deletion
  const handleDelete = async (taskId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete task');
      }

      setTasks(tasks.filter((task) => task._id !== taskId)); // Remove deleted task from list
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle task status update (completed/pending)
  const handleStatusChange = async (taskId, isCompleted) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: isCompleted ? 'completed' : 'pending' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update task status');
      }

      // Update the task status in the local state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: data.status } : task
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Your Tasks</h1>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            navigate('/login');
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading tasks...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks found. Create a new task!</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li
              key={task._id}
              className="bg-white shadow-lg p-4 rounded-md mb-4 flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{task.title}</h2>
                <p className="text-gray-600">{task.desc}</p>
                <p className="text-gray-400 text-sm">Category: {task.category || 'None'}</p>
                <p className="text-gray-400 text-sm">Due: {task.duedate || 'No deadline'}</p>
              </div>
              <div className="flex items-center space-x-2">
                {/* Checkbox for task completion */}
                <input
                  type="checkbox"
                  checked={task.status === 'completed'}
                  onChange={(e) => handleStatusChange(task._id, e.target.checked)}
                  className="w-5 h-5 cursor-pointer"
                />
                <button
                  onClick={() => navigate(`/tasks/${task._id}`)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={() => navigate('/tasks/create')}
        className="bg-green-500 text-white px-6 py-3 rounded-md mt-6 block mx-auto hover:bg-green-600"
      >
        Create New Task
      </button>
    </div>
  );
};

export default Home;