export default function CheckoutModal() {
    return (
        <dialog id={`checkout`} className="modal text-[#30313D]">
            <div className="modal-box py-12 px-12 space-y-6 rounded-xl">
              <div className="space-y-8">
                <div className="flex flex-col items-center space-y-3">
                  <p className="text-5xl font-extrabold">$5 <a className="text-sm text-gray-700 font-bold">USD</a></p>
                  <p className="cursor-default border border-green-500 text-green-500 font-medium bg-green-100 px-12 py-1 rounded-full text-xs text-center whitespace-nowrap">Pay once, get Lab Intern for life</p>
                </div>
                <div className="flex flex-col gap-3 w-full items-center justify-center items-start text-center">
                  <div className="space-y-3">
                    <p className="subtitle text-base text-gray-600"><a className="text-lg">🏫</a>Get 250+ researchers from top US schools </p>
                    <p className="subtitle text-base text-gray-600"><a className="text-lg">🌀</a>Filter by school, state & department</p>
                    <p className="subtitle text-base text-gray-600"><a className="text-lg">✉️</a>Message professors directly</p>
                    <p className="subtitle text-base text-gray-600"><a className="text-lg">✅</a>All data is manually verified</p>
                  </div>
                </div>
                <div className="w-full space-y-3">
                  <button className="main-cta w-full">Find my internship</button>
                  <p className="w-full text-sm text-gray-600 text-center">Pay once, get Lab Intern for life</p>
                </div>
              </div>
              <div className="flex-box flex-col md:flex-row gap-3">
                <div className="avatar-group -space-x-4 rtl:space-x-reverse">
                  <div className="avatar">
                    <div className="w-8">
                      <img src="/profilePictures/pp_ana.jpg" />
                    </div>
                  </div>
                  <div className="avatar">
                    <div className="w-8">
                      <img src="/profilePictures/cta1.jpeg" />
                    </div>
                  </div>
                  <div className="avatar bg-bottom">
                    <div className="w-8">
                      <img src="/profilePictures/cta2.png" />
                    </div>
                  </div>
                  <div className="avatar">
                    <div className="w-8">
                      <img src="/profilePictures/cta3.jpeg" />
                    </div>
                  </div>
                  <div className="avatar">
                    <div className="w-8">
                      <img src="/profilePictures/pp_ana.jpg" />
                    </div>
                  </div>
                  <div className="avatar">
                    <div className="w-8">
                      <img src="/profilePictures/cta1.jpeg" />
                    </div>
                  </div>
                  <div className="avatar bg-bottom">
                    <div className="w-8">
                      <img src="/profilePictures/cta2.png" />
                    </div>
                  </div>
  
                </div>
                <div className="flex-box flex-col md:items-start gap-1">
                <div className="flex flex-col items-center md:items-start">
                    <p>⭐️⭐️⭐️⭐️⭐️</p>
                    <p className="font-base text-sm">Loved by over 600 undergrads</p>
                </div>
                </div>
              </div>            
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
  }
  