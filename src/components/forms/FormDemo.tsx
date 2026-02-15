"use client";

import { useState } from "react";

export function FormDemo() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "developer",
    newsletter: true,
    bio: "",
  });

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter your name"
          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          style={{ backgroundColor: "var(--input-bg)", borderColor: "var(--border)" }}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="you@example.com"
          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          style={{ backgroundColor: "var(--input-bg)", borderColor: "var(--border)" }}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Role</label>
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          style={{ backgroundColor: "var(--input-bg)", borderColor: "var(--border)" }}
        >
          <option value="developer">Developer</option>
          <option value="designer">Designer</option>
          <option value="pm">Product Manager</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Bio</label>
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          placeholder="Tell us about yourself..."
          rows={3}
          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none"
          style={{ backgroundColor: "var(--input-bg)", borderColor: "var(--border)" }}
        />
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={formData.newsletter}
          onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
          className="rounded"
        />
        <span className="text-sm">Subscribe to newsletter</span>
      </label>
      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          className="px-4 py-2 rounded-full font-medium text-white"
          style={{ backgroundColor: "var(--primary)" }}
        >
          Save
        </button>
        <button
          type="button"
          className="px-4 py-2 rounded-full border"
          style={{ borderColor: "var(--border)" }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
