import { useEffect, useRef } from "react"

export default function UsedBy() {
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current
        let scrollAmount = 0

        const scrollStep = () => {
            scrollAmount += 1
            if (scrollAmount >= scrollContainer.scrollWidth / 2) {
                scrollAmount = 0
            }
            scrollContainer.scrollLeft = scrollAmount
            requestAnimationFrame(scrollStep)
        };

        requestAnimationFrame(scrollStep)
    }, [])
    return (
        <div className="space-y-6 w-full text-center">
            <p className="font-medium">Used by undergrads at</p>
            <div className="overflow-hidden w-full">
                <div ref={scrollContainerRef} className="flex space-x-6 md:space-x-24 animate-scroll">
                    {['/logos/harvard.png', '/logos/yale.png', '/logos/oxford.svg', '/logos/uab.png'].concat(
                        ['/logos/harvard.png', '/logos/yale.png', '/logos/oxford.svg', '/logos/uab.png']
                    ).map((logo, index) => (
                        <div key={index} className="flex-shrink-0 h-8 md:h-8">
                            <img src={logo} alt={`${logo} logo`} className="h-full w-auto" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}