import HeaderImg from '../json/header-img.json';

const Header = () => {
    return (
        
        <div className=' mt-4 flex justify-center flex-row gap-4 overflow-x-scroll overflow-y-hidden h-[120px]'>
            {
                HeaderImg.map((elements, i) => {
                    return (
                    <img key={i} src={elements.image} alt={elements.alt}/>
                    )
                })
            }
        </div>
    )
}

export default Header;