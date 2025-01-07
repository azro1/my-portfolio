const Loading = () => {
  return (
    <main className="min-h-screen">
      <div className="relative w-full min-h-screen flex items-center justify-center">
        <img 
          className="w-32 absolute top-[calc(50%-140px)] left-1/2 transform -translate-x-1/2" 
          src="/images/loading/loading.gif" 
          alt="a loading gif" 
        />
      </div>
    </main>
  )
}

export default Loading

