"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  BookOpen,
  Edit2,
  Trash2,
  Users,
  Building2,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

// Mock data model, replaced by actual service calls
const mockPrograms = [
  {
    $id: "prog_1",
    name: "BSc Computer Science",
    code: "BCS",
    departmentId: "dep_1",
    duration: "4 Years",
    status: "active",
  },
  {
    $id: "prog_2",
    name: "BSc Software Engineering",
    code: "BSE",
    departmentId: "dep_1",
    duration: "4 Years",
    status: "active",
  },
];

export default function ProgramsDashboard() {
  const [programs, setPrograms] = useState(mockPrograms);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingProgram, setIsAddingProgram] = useState(false);

  return (
    <DashboardLayout role="ADMIN">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Programs Management</h1>
            <p className="text-gray-500">Manage academic programs and student enrollments</p>
          </div>
          <button
            onClick={() => setIsAddingProgram(true)}
            className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
          >
            <Plus className="w-5 h-5" />
            <span>Add Program</span>
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <motion.div
              key={program.$id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-primary-50 p-3 rounded-lg">
                  <BookOpen className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-1">{program.name}</h3>
              <p className="text-sm text-gray-500 mb-4">Code: {program.code}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Building2 className="w-4 h-4 mr-2" />
                  <span>Dept ID: {program.departmentId}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>Duration: {program.duration}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  program.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
                </span>
                <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
                  View Students &rarr;
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
