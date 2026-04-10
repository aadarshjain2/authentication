interface Props {
  name: string;
  email: string;
}

export function ProfileCard({ name, email }: Props) {
  const initials = name.split(" ").map((w) => w[0]).join("").toUpperCase();

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">
      <p className="text-md font-medium text-gray-400 uppercase tracking-wider mb-4">Profile</p>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-semibold text-md">
          {initials}
        </div>
        <div>
          <p className="font-medium text-gray-900">{name}</p>
          <p className="text-md text-gray-400">{email}</p>
        </div>
      </div>
    </div>
  );
}