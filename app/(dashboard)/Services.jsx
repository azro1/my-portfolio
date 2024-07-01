
const Services = () => {
  return (
    <section>
      <div className="flex flex-col items-center md:flex md:flex-row md:items-center mb-6.25">
        <img className="w-64" src="/images/homepage/services/web.svg" alt="A visual representation of the web development process"/>
        <div className="flex flex-col items-center text-center pt-6 md:flex md:flex-col md:items-start md:text-left md:ml-2.375">
          <h2 className="subheading font-b text-hint pb-3">Web Development</h2>
          <p className="leading-6">I'm a passionate and detail-oriented web developer dedicated to creating unique, functional, and visually appealing websites with a strong foundation in both front-end and back-end technologies.</p>
        </div>
      </div>
      <div className="flex flex-col items-center md:flex md:flex-row-reverse md:items-center mb-6.25">
        <img className="max-w-xs" src="/images/homepage/services/ui_design.svg" alt="A visual representation of the UI design process"/>
        <div className="flex flex-col items-center text-center pt-6 md:flex md:flex-col md:items-start md:text-left md:mr-1.875">
          <h2 className="subheading font-b text-hint pb-3">UI Design</h2>
          <p className="leading-6">I'm a creative UI designer with a passion for crafting visually stunning and intuitive user interfaces. I specialize in translating ideas into engaging designs that not only captivate users but also enhance overall user experiences</p>
        </div>
      </div>
      <div className="flex flex-col items-center md:flex md:flex-row md:items-center mb-6.25">
        <img className="max-w-13.5" src="/images/homepage/services/mobile.svg" alt="A visual representation of the mobile app development process" />
        <div className="flex flex-col items-center text-center pt-6 md:flex md:flex-col md:items-start md:text-left md:ml-2.375">
          <h2 className="subheading font-b text-hint pb-3">Mobile Development</h2>
          <p className="leading-6">Experienced in crafting seamless user experiences for both iOS and Android platforms. Passionate about turning innovative ideas into captivating mobile applications. With strong technical skills and a creative touch, I'm geared to take mobile development to the next level.</p>
        </div>
      </div>
      <div className="flex flex-col items-center md:flex md:flex-row-reverse md:items-center">
        <img className="max-w-xs" src="/images/homepage/services/graph_design.svg" alt="A visual representation of the graphic design process" />
        <div className="flex flex-col items-center text-center pt-6 md:flex md:flex-col md:items-start md:text-left md:mr-1.875">
          <h2 className="subheading font-b text-hint pb-3">Graphic Design</h2>
          <p className="leading-6">A passionate graphic designer adept at transforming ideas into visually striking concepts. Proficient in delivering impactful designs that resonate with target audiences. Eager to bring a unique blend of creativity and precision to your visual projects.</p>
        </div>
      </div>
    </section>
  )
}

export default Services
