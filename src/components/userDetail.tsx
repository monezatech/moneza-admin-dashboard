import React from "react";
import Modal from "./Modal";
import {
  Mail,
  Phone,
  User,
  MapPin,
  Calendar,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Award,
  Link,
} from "lucide-react";

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
    icon: Icon,
    label,
    value,
  }: {
    icon: React.ElementType;
    label: string;
    value: string | number;
  }) => (
    <div className="flex items-center gap-2 text-sm border-b py-2">
      <Icon className="w-4 h-4 text-gray-500" />
      <span className="font-medium text-gray-600">{label}:</span>
      <span className="ml-auto text-gray-800">{value}</span>
    </div>
  );

  const StatusBadge = ({ status }: { status: string }) => {
    const colors =
      status === "active"
        ? "bg-green-100 text-green-700"
        : status === "completed"
        ? "bg-blue-100 text-blue-700"
        : "bg-red-100 text-red-700";

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${colors}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 border-b flex justify-between items-center px-4 py-3">
          <h2 className="text-xl font-bold">👤 User Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {/* Left Column - User Info */}
          <div className="bg-white shadow rounded-xl p-4">
            <div className="flex flex-col items-center mb-4">
              <img
                src={user.profilePic}
                alt={user.fullName}
                className="w-28 h-28 rounded-full object-cover shadow-md mb-2"
              />
              <h3 className="text-lg font-semibold">{user.fullName}</h3>
              <p className="text-sm text-gray-500">{user.role}</p>
            </div>

            <div className="space-y-1">
              <DetailItem icon={Mail} label="Email" value={user.email} />
              <DetailItem icon={Phone} label="Phone" value={user.phone} />
              <DetailItem
                icon={Calendar}
                label="Date of Birth"
                value={user.dob ?? "-"}
              />
              <DetailItem
                icon={User}
                label="Gender"
                value={user.gender ?? "-"}
              />
              <DetailItem
                label="Status"
                value={user.status ?? "-"}
                icon={ShieldCheck}
              />
              <DetailItem
                label="Membership"
                value={user.membershipTier ?? "-"}
                icon={Award}
              />
              <DetailItem
                label="Created At"
                value={formatDate(user.createdAt)}
                icon={Calendar}
              />
              <DetailItem
                label="Updated At"
                value={formatDate(user.updatedAt)}
                icon={Calendar}
              />
              <DetailItem
                label="Last Login"
                value={user.lastLogin ? formatDate(user.lastLogin) : "-"}
                icon={Calendar}
              />
              <DetailItem
                label="Total Spent"
                value={`₹${user.totalSpent?.toFixed(2) ?? "0.00"}`}
                icon={CheckCircle}
              />
              <DetailItem
                label="Referral Code"
                value={user.referralCode ?? "-"}
                icon={Link}
              />
              <DetailItem
                label="Email Verified"
                value={user.isEmailVerified ? "Yes" : "No"}
                icon={user.isEmailVerified ? CheckCircle : XCircle}
              />
              <DetailItem
                label="Phone Verified"
                value={user.isPhoneVerified ? "Yes" : "No"}
                icon={user.isPhoneVerified ? CheckCircle : XCircle}
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
                      className="text-blue-600 hover:underline text-sm"
                    >
                      LinkedIn
                    </a>
                  )}
                  {user.socialLinks.twitter && (
                    <a
                      href={user.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-500 hover:underline text-sm"
                    >
                      Twitter
                    </a>
                  )}
                  {user.socialLinks.facebook && (
                    <a
                      href={user.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:underline text-sm"
                    >
                      Facebook
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Courses */}
          <div className="md:col-span-2 bg-white shadow rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              📚 Purchased Courses
            </h3>

            {courses.length === 0 ? (
              <p className="text-gray-500 text-sm">
                No purchased courses found.
              </p>
            ) : (
              <ul className="space-y-4">
                {courses.map((course) => (
                  <li
                    key={course.id}
                    className="border rounded-lg p-4 shadow-sm hover:shadow-md transition flex flex-col md:flex-row md:justify-between"
                  >
                    <div>
                      <h4 className="font-semibold text-base flex items-center gap-2">
                        {course.title} <StatusBadge status={course.status} />
                      </h4>
                      <p className="text-sm text-gray-500">
                        Purchased: {formatDate(course.purchaseDate)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Price: ₹ {course.price.toFixed(2)}
                      </p>
                      {course.progress !== undefined && (
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      )}
                    </div>

                    <div className="mt-3 md:mt-0 flex flex-col gap-2 md:flex-row">
                      <button
                        onClick={() =>
                          alert(
                            `Navigate to course details for ${course.title}`
                          )
                        }
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
                      >
                        View Course
                      </button>
                      {course.certificateUrl &&
                        course.status === "completed" && (
                          <a
                            href={course.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm text-center"
                          >
                            🎓 Certificate
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
