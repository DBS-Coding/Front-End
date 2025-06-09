// eslint-disable-next-line no-unused-vars
const Profile = ({ image, nama, tahun, Icon }) => {
  return (
    <div className="p-3 border-b border-amber-400/30 bg-gradient-to-b from-amber-500/10 to-transparent">
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={image || "/histotalkicon.jpg"}
            alt="Ir. Soekarno"
            className="w-20 h-20 object-cover rounded-2xl border-4 border-amber-300 shadow-xl"
          />
          <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center border-2 border-amber-300">
            <Icon className="w-3.5 h-3.5 text-amber-900" />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-amber-100 mb-1">
            {nama}
          </h2>
          <p className="text-amber-300 text-sm">{tahun}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
