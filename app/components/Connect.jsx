const Connect = () => {
  return (
    <section className="mt-8.375 mb-16 md:mb-36 lg:mt-12.5">
      <div className="flex flex-col items-center text-center md:flex md:flex-row md:items-center md:justify-center">
        <div className="grid grid-cols-3 gap-5 md:gap-7 md:w-1/2">
          <img className="row-start-2 col-start-2" src="https://via.placeholder.com/228x194"/>
          <img className="row-start-2 col-start-3" src="https://via.placeholder.com/228x194"/>
          <img className="row-start-1 col-start-3" src="https://via.placeholder.com/228x194"/>
          <img className="row-start-2" src="https://via.placeholder.com/228x194"/>
          <img className="col-start-2" src="https://via.placeholder.com/228x194"/>
        </div>
  
        <div className="pt-5 md:pt-0 md:self-center md:pl-8 md:w-1/2">
          <h2 className="subheading text-hint pb-3">Connect With Me</h2>
          <p className="leading-6">Follow me on LinkedIn for professional insights, GitHub for code repositories and projects, and subscribe to my YouTube channel CodeDynamics where I share insights and tutorials on Full Stack Development, UI Design, and more.</p>
        </div>
      </div>
    </section>
  )
}

export default Connect