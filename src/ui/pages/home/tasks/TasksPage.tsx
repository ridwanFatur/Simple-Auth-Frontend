import { useState } from "react";
import {
  PlusIcon,
  SearchIcon,
  CheckCircleIcon,
  Circle,
  Clock,
  CalendarIcon,
  TagIcon,
} from "lucide-react";

const tasksData = [
  {
    id: 1,
    title: "Complete website mockup designs",
    description: "Finalize the homepage and product page designs",
    dueDate: "2023-12-10",
    priority: "High",
    status: "In Progress",
    project: "Website Redesign",
  },
  {
    id: 2,
    title: "Review analytics report",
    description: "Analyze Q3 performance metrics and prepare summary",
    dueDate: "2023-12-05",
    priority: "Medium",
    status: "Pending",
    project: "Marketing Campaign",
  },
  {
    id: 3,
    title: "Update user documentation",
    description: "Revise the help guides with new features",
    dueDate: "2023-12-15",
    priority: "Low",
    status: "Completed",
    project: "Product Launch",
  },
  {
    id: 4,
    title: "Prepare investor presentation",
    description: "Create slides for the upcoming funding round",
    dueDate: "2023-12-08",
    priority: "High",
    status: "In Progress",
    project: "Funding Round",
  },
  {
    id: 5,
    title: "Schedule team building event",
    description: "Coordinate with HR for Q4 team activities",
    dueDate: "2023-12-20",
    priority: "Medium",
    status: "Pending",
    project: "HR Initiatives",
  },
  {
    id: 6,
    title: "Fix navigation menu bug",
    description: "Address the dropdown menu issue on mobile devices",
    dueDate: "2023-12-03",
    priority: "Critical",
    status: "In Progress",
    project: "Website Redesign",
  },
];

export default function TasksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredTasks = tasksData
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.project.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((task) => {
      if (filter === "all") return true;
      if (filter === "completed") return task.status === "Completed";
      if (filter === "pending") return task.status === "Pending";
      if (filter === "inProgress") return task.status === "In Progress";
      return true;
    });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "text-red-600 bg-red-50";
      case "High":
        return "text-orange-600 bg-orange-50";
      case "Medium":
        return "text-blue-600 bg-blue-50";
      case "Low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <PlusIcon size={16} className="mr-2" />
          Add Task
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-2">
          <button
            className={`px-3 py-1.5 rounded-lg font-medium text-sm ${
              filter === "all"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-3 py-1.5 rounded-lg font-medium text-sm ${
              filter === "inProgress"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setFilter("inProgress")}
          >
            In Progress
          </button>
          <button
            className={`px-3 py-1.5 rounded-lg font-medium text-sm ${
              filter === "pending"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
          <button
            className={`px-3 py-1.5 rounded-lg font-medium text-sm ${
              filter === "completed"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search tasks..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-lg shadow p-4 border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <div className="pt-1">
                {task.status === "Completed" ? (
                  <CheckCircleIcon size={20} className="text-green-500" />
                ) : (
                  <Circle size={20} className="text-gray-300" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3
                    className={`font-medium ${
                      task.status === "Completed"
                        ? "text-gray-500 line-through"
                        : "text-gray-800"
                    }`}
                  >
                    {task.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full flex items-center ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      <TagIcon size={12} className="mr-1" />
                      {task.priority}
                    </span>

                    <span className="text-xs text-gray-500 flex items-center">
                      <CalendarIcon size={12} className="mr-1" />
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>

                    <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                      {task.project}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mt-1">{task.description}</p>

                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center">
                    <Clock size={14} className="text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500">
                      {task.status === "Completed"
                        ? "Completed"
                        : `Due in 1 days`}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="text-xs text-blue-600 hover:text-blue-800">
                      Edit
                    </button>
                    <button className="text-xs text-red-600 hover:text-red-800">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No tasks found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
