import Card from './Card'

const Services = () => {
  return (
    <section className="mt-6.25 lg:mt-16">
      <div>
        <div className="flex flex-col items-center md:flex md:flex-row md:items-center mb-6.25">
          <Card values={"min-w-max"}>
            <img className='md:w-full' src="https://via.placeholder.com/284x232" alt="A visual representation of the web development process"/>
          </Card>
          <div className="flex flex-col items-center text-center pt-6 md:flex md:flex-col md:items-start md:text-left md:ml-2.375">
            <h2 className="subheading text-hint pb-3">Web Development</h2>
            <p className="leading-6">Lorem ipsum dolor sit amet consectetur. Commodo enim quis pharetra sagittis. Lacus cursus consequat viverra velit amet suscipit dolor neque praesent. Aliquam arcu felis aliquet enim. Dictumst diam tempus odio adipiscing. Fringilla mauris amet tempus</p>
          </div>
        </div>
        <div className="flex flex-col items-center md:flex md:flex-row-reverse md:items-center mb-6.25">
          <Card values={"min-w-max"}>
            <img src="https://via.placeholder.com/284x232" alt="A visual representation of the UI design process"/>
          </Card>
          <div className="flex flex-col items-center text-center pt-6 md:flex md:flex-col md:items-start md:text-left md:mr-2.375">
            <h2 className="subheading text-hint pb-3">UI Design</h2>
            <p className="leading-6">Lorem ipsum dolor sit amet consectetur. Commodo enim quis pharetra sagittis. Lacus cursus consequat viverra velit amet suscipit dolor neque praesent. Aliquam arcu felis aliquet enim. Dictumst diam tempus odio adipiscing. Fringilla mauris amet tempus</p>
          </div>
        </div>
        <div className="flex flex-col items-center md:flex md:flex-row md:items-center mb-6.25">
        <Card values={"min-w-max"}>
          <img src="https://via.placeholder.com/284x232" alt="A visual representation of the we design process" />
        </Card>
          <div className="flex flex-col items-center text-center pt-6 md:flex md:flex-col md:items-start md:text-left md:ml-2.375">
            <h2 className="subheading text-hint pb-3">Web Design</h2>
            <p className="leading-6">Lorem ipsum dolor sit amet consectetur. Commodo enim quis pharetra sagittis. Lacus cursus consequat viverra velit amet suscipit dolor neque praesent. Aliquam arcu felis aliquet enim. Dictumst diam tempus odio adipiscing. Fringilla mauris amet tempus</p>
          </div>
        </div>
        <div className="flex flex-col items-center md:flex md:flex-row-reverse md:items-center">
          <Card values={"min-w-max"}>
            <img src="https://via.placeholder.com/284x232" alt="A visual representation of the graphic design process" />
          </Card>
          <div className="flex flex-col items-center text-center pt-6 md:flex md:flex-col md:items-start md:text-left md:mr-2.375">
            <h2 className="subheading text-hint pb-3">Graphic Design</h2>
            <p className="leading-6">Lorem ipsum dolor sit amet consectetur. Commodo enim quis pharetra sagittis. Lacus cursus consequat viverra velit amet suscipit dolor neque praesent. Aliquam arcu felis aliquet enim. Dictumst diam tempus odio adipiscing. Fringilla mauris amet tempus</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
