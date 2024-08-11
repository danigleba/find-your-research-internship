export default function CheckoutModal() {
    return (
        <dialog id={`checkout`} className="modal text-[#30313D]">
            <div className="modal-box space-y-6 rounded-xl">
                <p>pay money</p>                   
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
  }
  