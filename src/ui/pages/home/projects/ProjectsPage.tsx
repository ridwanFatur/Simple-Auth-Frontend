import { useState } from "react";
import {
  PlusIcon,
  SearchIcon,
  FolderIcon,
  StarIcon,
  ClockIcon,
  UserIcon,
} from "lucide-react";

const projectsData = [
  {
    id: 1,
    name: "Website Redesign",
    status: "In Progress",
    progress: 65,
    dueDate: "2023-12-15",
    members: 4,
    isFavorite: true,
  },
  {
    id: 2,
    name: "Mobile App Development",
    status: "Planning",
    progress: 20,
    dueDate: "2024-02-28",
    members: 6,
    isFavorite: false,
  },
  {
    id: 3,
    name: "Marketing Campaign",
    status: "Completed",
    progress: 100,
    dueDate: "2023-11-30",
    members: 3,
    isFavorite: true,
  },
  {
    id: 4,
    name: "Product Launch",
    status: "In Progress",
    progress: 45,
    dueDate: "2024-01-15",
    members: 8,
    isFavorite: false,
  },
  {
    id: 5,
    name: "Customer Research",
    status: "Planning",
    progress: 10,
    dueDate: "2024-03-10",
    members: 2,
    isFavorite: false,
  },
];

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projectsData.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <PlusIcon size={16} className="mr-2" />
          New Project
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg font-medium text-sm">
            All
          </button>
          <button className="px-3 py-1.5 text-gray-600 hover:bg-gray-50 rounded-lg font-medium text-sm">
            Active
          </button>
          <button className="px-3 py-1.5 text-gray-600 hover:bg-gray-50 rounded-lg font-medium text-sm">
            Completed
          </button>
        </div>
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search projects..."
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow p-5 border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <FolderIcon size={20} className="text-blue-500 mr-2" />
                <h3 className="font-medium text-gray-800">{project.name}</h3>
              </div>
              <button className="text-gray-400 hover:text-yellow-500">
                <StarIcon
                  size={18}
                  fill={project.isFavorite ? "currentColor" : "none"}
                  className={project.isFavorite ? "text-yellow-400" : ""}
                />
              </button>
            </div>

            <div className="mb-4">
              <span
                className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                  project.status === "Completed"
                    ? "bg-green-100 text-green-800"
                    : project.status === "In Progress"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {project.status}
              </span>
            </div>

            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    project.progress === 100
                      ? "bg-green-500"
                      : project.progress > 50
                      ? "bg-blue-500"
                      : "bg-amber-500"
                  }`}
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <ClockIcon size={14} className="mr-1" />
                <span>{new Date(project.dueDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <UserIcon size={14} className="mr-1" />
                <span>{project.members}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
