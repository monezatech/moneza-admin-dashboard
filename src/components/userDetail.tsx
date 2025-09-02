import React from "react";
import Modal from "./Modal";

type User = {
  profilePic: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  dob?: string;
  gender?: string;
  status?: string;
  membershipTier?: string;
  socialLinks?: { linkedin?: string; twitter?: string; facebook?: string };
  lastLogin?: string;
  totalSpent?: number;
  referralCode?: string;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  bio?: string;
};

type Course = {
  id: string;
  title: string;
  purchaseDate: string;
  price: number;
  status: "active" | "completed" | "expired";
  progress?: number;
  certificateUrl?: string;
};

type UserDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  courses: Course[];
};

export default function UserDetailModal({
  isOpen,
  onClose,
  user,
  courses,
}: UserDetailModalProps) {
  if (!user) return null;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const DetailItem = ({
    label,
    value,
  }: {
    label: string;
    value: string | number;
  }) => (
    <div className="flex justify-between border-b py-1 text-sm">
      <span className="font-medium text-gray-600">{label}:</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
<div className="max-h-[80vh] overflow-y-auto px-2">
        {" "}
        <h2 className="text-2xl font-bold mb-6 text-center">User Detail</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - User Info */}
          <div>
            <div className="flex flex-col items-center mb-4">
              <img
                src={user.profilePic}
                alt={user.fullName}
                className="w-24 h-24 rounded-full object-cover shadow-md mb-2"
              />
              <h3 className="text-lg font-semibold">{user.fullName}</h3>
              <p className="text-sm text-gray-500">{user.role}</p>
            </div>

            <div className="space-y-1">
              <DetailItem label="Email" value={user.email} />
              <DetailItem label="Phone" value={user.phone} />
              <DetailItem label="Address" value={user.address} />
              <DetailItem label="Date of Birth" value={user.dob ?? "-"} />
              <DetailItem label="Gender" value={user.gender ?? "-"} />
              <DetailItem label="Status" value={user.status ?? "-"} />
              <DetailItem
                label="Membership"
                value={user.membershipTier ?? "-"}
              />
              <DetailItem
                label="Created At"
                value={formatDate(user.createdAt)}
              />
              <DetailItem
                label="Updated At"
                value={formatDate(user.updatedAt)}
              />
              <DetailItem
                label="Last Login"
                value={user.lastLogin ? formatDate(user.lastLogin) : "-"}
              />
              <DetailItem
                label="Total Spent"
                value={`$${user.totalSpent?.toFixed(2) ?? "0.00"}`}
              />
              <DetailItem
                label="Referral Code"
                value={user.referralCode ?? "-"}
              />
              <DetailItem
                label="Email Verified"
                value={user.isEmailVerified ? "Yes" : "No"}
              />
              <DetailItem
                label="Phone Verified"
                value={user.isPhoneVerified ? "Yes" : "No"}
              />
            </div>

            {user.bio && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-700 mb-1">Bio</h4>
                <p className="text-sm text-gray-600">{user.bio}</p>
              </div>
            )}

            {user.socialLinks && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-700 mb-1">
                  Social Links
                </h4>
                <div className="flex gap-3">
                  {user.socialLinks.linkedin && (
                    <a
                      href={user.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      LinkedIn
                    </a>
                  )}
                  {user.socialLinks.twitter && (
                    <a
                      href={user.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-500 hover:underline"
                    >
                      Twitter
                    </a>
                  )}
                  {user.socialLinks.facebook && (
                    <a
                      href={user.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:underline"
                    >
                      Facebook
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Courses */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold mb-3">Purchased Courses</h3>

            {courses.length === 0 ? (
              <p className="text-gray-500 text-sm">
                No purchased courses found.
              </p>
            ) : (
              <ul className="space-y-4">
                {courses.map((course) => (
                  <li
                    key={course.id}
                    className="border rounded-lg p-4 shadow-sm flex flex-col md:flex-row md:justify-between"
                  >
                    <div>
                      <h4 className="font-semibold text-base">
                        {course.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Purchased: {formatDate(course.purchaseDate)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Price: ${course.price.toFixed(2)}
                      </p>
                      <p className="text-sm">
                        Status:{" "}
                        <span
                          className={`font-semibold ${
                            course.status === "active"
                              ? "text-green-600"
                              : course.status === "completed"
                              ? "text-blue-600"
                              : "text-red-500"
                          }`}
                        >
                          {course.status.charAt(0).toUpperCase() +
                            course.status.slice(1)}
                        </span>
                      </p>
                      {course.progress !== undefined && (
                        <p className="text-sm">Progress: {course.progress}%</p>
                      )}
                    </div>

                    <div className="mt-3 md:mt-0 flex flex-col gap-2 md:flex-row">
                      <button
                        onClick={() =>
                          alert(
                            `Navigate to course details for ${course.title}`
                          )
                        }
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      >
                        View Course
                      </button>
                      {course.certificateUrl &&
                        course.status === "completed" && (
                          <a
                            href={course.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-center"
                          >
                            Download Certificate
                          </a>
                        )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
