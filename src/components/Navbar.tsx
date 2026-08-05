import Button from './Button'

const Navbar = () => {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 sm:px-6 sm:py-4 md:px-10">
        <div className="leading-tight">
            <h1 className="text-xs font-medium tracking-widest text-gray-500 sm:text-sm">SOMEWHERE IN</h1>
            <h1 className="text-lg font-bold sm:text-xl md:text-2xl">Mumbai</h1>
        </div>
        <Button className="text-sm sm:text-base px-6">Log in</Button>
    </nav>
  )
}

export default Navbar