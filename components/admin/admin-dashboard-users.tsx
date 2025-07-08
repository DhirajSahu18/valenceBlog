"use client";

import React, { useState } from "react";
import { User } from "./admin-dashboard";
import { Pencil, Trash2, Check } from "lucide-react";

interface AdminDashboardUsersProps {
  users: User[];
}

const AdminDashboardUsers = ({ users }: AdminDashboardUsersProps) => {
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState<string>("");

  const handleEditClick = (userId: string, currentName: string) => {
    setEditingUserId(userId);
    setEditedName(currentName);
  };

  const handleSave = async (userId: string) => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editedName }),
      });

      if (!res.ok) throw new Error("Failed to update user");

      setEditingUserId(null);
      window.location.reload(); // Refresh to reflect update (can optimize with state instead)
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete user");

      window.location.reload(); // Refresh to reflect deletion
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div>
      {users.map((user) => (
        <div
          key={user.id}
          className="border-b p-4 bg-[#1b1e22] rounded-sm relative hover:bg-[#2a2f36] transition-colors m-4"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              {editingUserId === user.id ? (
                <input
                  className="text-sm px-2 py-1 bg-gray-800 rounded text-white"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              ) : (
                <div className="text-sm text-muted-foreground">
                  Name: {user.name}
                </div>
              )}
              <p className="text-sm text-muted-foreground">
                Email: {user.email}
              </p>
              <p className="text-sm text-muted-foreground">Role: {user.role}</p>
            </div>

            <div className="flex gap-3 mt-1">
              {editingUserId === user.id ? (
                <button
                  className="text-green-400 text-sm hover:underline"
                  onClick={() => handleSave(user.id)}
                >
                  <Check className="h-5 w-5" />
                </button>
              ) : (
                <button onClick={() => handleEditClick(user.id, user.name)}>
                  <Pencil className="h-4 w-4 text-blue-400 hover:text-blue-500" />
                </button>
              )}

              <button onClick={() => handleDelete(user.id)}>
                <Trash2 className="h-4 w-4 text-red-400 hover:text-red-500" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboardUsers;
