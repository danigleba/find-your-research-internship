export default function Testimonial({ text, name, username, link, profilePicture }) {
    return (
        <div className="testimonial">
            <p className="text-lg">{text}</p>
            <div className="flex-box justify-between">
                <div className="flex-box gap-3">
                    <div className="w-12 aspect-square rounded-full bg-gray-700 bg-center bg-cover" style={{ backgroundImage: `url('${profilePicture}')` }}></div>
                    <div>
                        <p className="font-semibold">{name}</p>
                        <p className="text-sm">{username}</p>
                    </div>
                </div>
                <a href={link} target="_blank" className="w-6 aspect-square bg-center bg-cover" style={{ backgroundImage: "url('/logos/x.svg')" }}></a>
            </div>
        </div>
    )
}
