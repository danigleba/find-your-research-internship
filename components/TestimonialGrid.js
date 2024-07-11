import Testimonial from "./Testimonial"

export default function TestimonialGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-6 md:px-24">
          <div className="flex-col space-y-6">
            <Testimonial 
              text="Its like Tinder for research collabs, I like it!" 
              name="Balázs Szigeti"
              username="@psybalazs"
              profilePicture="/profilePictures/balazs.jpg"
              link="https://x.com/psybalazs/status/1801109309885120738"
            />
            <Testimonial 
              text="LOVE this idea! Its sooooo valuable. Good luck✨✨✨" 
              name="Neeti Patel"
              username="@Neeti_patel"
              profilePicture="/profilePictures/neeti.jpg"
              link="https://x.com/Neeti_patel/status/1809330509371043929"
            />
            <Testimonial 
              text="Very cool!" 
              name="Andrea Perino, PhD"
              username="@AndreaPerino1"
              profilePicture="/profilePictures/andrea.jpg"
              link="https://x.com/Ana_BurgosRuiz/status/1793670564093260103"
            />
          </div>
          <div className="flex-col space-y-6">
          <Testimonial 
              text="I've been waiting for this 🙌" 
              name="Kaushlendra Mani"
              username="@kaush_trip"
              profilePicture="/profilePictures/kaush.jpg"
              link="https://x.com/kaush_trip/status/1795901809808007302"
            />
            <Testimonial 
              text="Wish you had some help with your next sequencing assay or image analysis? Check out Portiko!" 
              name="eLife Community"
              username="@eLifeCommunity"
              profilePicture="/profilePictures/elife.jpg"
              link="https://x.com/eLifeCommunity/status/1798374722947739660"
            />
          </div>
          <div className="flex-col space-y-6">
            <Testimonial 
              text="This is really a great initiative. A platform to contribute your expertise to cool research projects or find collaborators with specific expertise to help you with your projects." 
              name="Colm Walsh"
              username="@colmw37"
              profilePicture="/profilePictures/veera.jpg"
              link="https://x.com/Ana_BurgosRuiz/status/1795540097833824439"
            />
            <Testimonial 
              text="Such a good idea! Joined" 
              name="Veera Rajagopal"
              username="@doctorveera"
              profilePicture="/profilePictures/colm.jpg"
              link="https://x.com/doctorveera/status/1798467567822184608"
            />
          </div>
        </div>
    )
}
