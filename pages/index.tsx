import { FormEvent, useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import { Context } from "vm";
import Image from "next/image";

const myLoader = ({ src }: any) => {
  return src;
}

export default function Home({spaces, services, texts}: any) {
    
  return (
    <div className='relative flex flex-col w-full h-screen bg-gray-100 z-0'>

      <div className="bg-gray-100">
        <Header />
        <Hero data={texts} />
        <Espacos data={spaces}/>
      </div>

      <Separator />

      <div className="bg-gray-100">
        <Servicos  data={services}/>
        <Contactos />
      </div>

    </div>
  )
}

export function Header() {

  const headerRef = useRef<HTMLElement>(null);

  const scrollToElement = (id: string) => {

    const heightHeader = (headerRef.current?.offsetHeight || 0);
    window.scroll({
      top: (document.getElementById(id)?.offsetTop || 0) - heightHeader,
      behavior: 'smooth'
    })
  }

  const scrollToTop = () => {
    
    window.scrollTo({top: 0, behavior: 'smooth'});
  }


  return (
    <header ref={headerRef} className='fixed hidden md:flex bg-blue-600 left-0 top-0 w-full z-50 shadow-md shadow-[#0000002c]'>
        <div className='w-[100%] m-auto flex justify-between'>
          
          <div className='w-auto flex items-center px-12 select-none'>
            <h1 onClick={() => scrollToTop()} className='text-white text-3xl font-bold uppercase cursor-pointer'>Jogo de Negro</h1>
          </div>

          <ul className='flex justify-center items-center w-auto'>
            <li onClick={() => scrollToElement("sobre")} className='mx-4 text-white font-base text-base cursor-pointer hover:text-blue-400 transition-colors duration-700 '>
              <h4>Sobre Nós</h4>
            </li>
            <li onClick={() => scrollToElement("espacos")} className='mx-4 text-white font-base text-base cursor-pointer hover:text-blue-400 transition-colors duration-700 '>
              <h4>Espaços</h4>
            </li>
            <li onClick={() => scrollToElement("servicos")} className='mx-4 text-white font-base text-base cursor-pointer hover:text-blue-400 transition-colors duration-700 '>
              <h4>Serviços</h4>
            </li>
            <li onClick={() => scrollToElement("contactos")} className='mx-4 text-white font-base text-base cursor-pointer hover:text-blue-400 transition-colors duration-700 '>
              <h4>Contactos</h4>
            </li>
          </ul>

          <div className='w-auto flex justify-center items-center'>
            <button onClick={() => scrollToElement("espacos")} className='relative w-full h-full bg-gray-800 py-6 text-blue-100 text-lg font-bold uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all duration-500 px-12'>
              Vem Treinar
            </button>
          </div>

        </div>
    </header>
  )
}

export function Hero({data}: any) {

  const texts = [
    data[0],
    data[1],
    data[2]
  ]

  return (
    <main className='relative flex flex-col z-0 '>
        <video src='/vd/video1_AdobeExpress.mp4' autoPlay={true} loop={true} muted={true} className='relative w-full h-[110vh] object-cover -z-10' ></video>
        <div className='relative md:w-[95%] lg:w-[70%] m-auto'>

          <div className='relative w-full h-auto grid-rows-4 md:grid grid-cols-2 md:grid-rows-2 shadow-md md:-translate-y-[50%] md:-mb-[20rem] lg:-mb-[16rem]'>
            
            <div className='bg-gray-50 bg-opacity-90 px-8 py-16 flex flex-col items-center justify-center' >
              <h1 className='text-3xl font-bold text-gray-700 uppercase mb-10 text-center'>{data[0]?.title}</h1>
              <p className='text-gray-700 text-center font-sm'>
                {data[0]?.description}
              </p>
            </div>

            <div className='bg-[#f97416b9] px-8 py-16 flex flex-col items-center justify-center'>
              <h1 className='text-3xl font-bold text-white uppercase mb-10 text-center'>{data[1]?.title}</h1>
              <p className='text-white text-center font-sm'>
                {data[1]?.description}
              </p>
            </div>

            <div className='bg-[#45b29dd9] px-8 py-16 flex flex-col items-center justify-center'>
              <h1 className='text-3xl font-bold text-white uppercase mb-10 text-center'>{data[2]?.title}</h1>
              <p className='text-white text-center font-sm'>
                {data[2]?.description}              
              </p>
            </div>

            <div className='bg-[#254151d9] px-8 py-16 flex flex-col items-center justify-center' >
              <h1 className='text-3xl font-bold text-white uppercase mb-10 text-center'>Queres Experiemntar?</h1>
              <button className='rounded-md cursor-auto shadow-md hover:bg-opacity-60 hover:text-[#254151] duration-500 bg-white text-[#254151d9]  p-4 text-base tracking-wide font-bold uppercase' id='sobre'>Encontra o local ideal para ti!</button>              
            </div>
          </div>

        </div>
    </main>
  )
}

export function Espacos({data}: any) {
    
  const loadSpaces = () => {

      return data?.map((el: any, i: number) => {

          return <Card data={el} key={i} />
      })
  }

  const Card = ({data}: any) => {

    return (
        <div className='relative  my-10 rounded-sm overflow-hidden max-w-[300px] h-auto'>
            
            <img alt="" />
            <Image loader={myLoader} src={data.imageUrl} width={300} height={300} className='object-cover w-[300px] h-[300px]' alt={data.name}/>

            <div className='border-[1.5px] border-gray-300 p-4 flex flex-col pt-8'>
                <h1 className='text-blue-900 text-xl font-bold text-center tracking-wide'>{data.name}</h1>
                <h3 className='text-gray-900 text-base font-light text-center tracking-normal mt-6'>{data.location}</h3>
                
                <div className='flex items-center justify-center relative mt-12'>
                    <a href={data.mapsUrl} target={"_blank"} className='relative py-4 px-10 text-gray-200 uppercase font-bold bg-blue-900 rounded-full shadow-sm tracking-wide'>
                        Vem Visitar
                    </a>
                </div>
            </div>
        </div>
    )
  }
  
  return (
      <section className='mb-12' id='espacos'>
          <div className='relative  md:w-[95%] lg:w-[70%] m-auto pt-20'>
              <h1 className='text-3xl font-bold text-blue-900 uppercase mb-8 text-center'>Espaços de Treino</h1>
              <h4 className='mb-10 text-center text-base tracking-wider'>Vé o que fica mais acessivel, para conseguires vir treinar!</h4>

              <div className='flex flex-wrap items-center justify-center md:justify-between '>
                  {loadSpaces()}
              </div>
          </div>
      </section>
  )
}

export function Separator() {
    

  return (
      <div className='relative w-[100%] flex p-0 m-auto -z-20'>
          
          <img src="/img/separator.jpg" alt="" className='fixed w-full h-[100vh] left-0 bottom-0 object-cover -z-10 blur-[2px]'/>
          <div className='absolute w-full h-full left-0 bottom-0 bg-blue-600 bg-opacity-70'></div>


          <div className='relative w-[5%]  h-[150px] z-0 bg-gray-100 '></div>
          <div className='relative w-[90%] h-[150px] z-0 bg-transparent flex justify-center items-center'>
              <h1 className='text-2xl text-white uppercase font-bold tracking-wide mr-8'>Ainda estás com dúvidas?</h1>
              
              <button className='bg-white p-4 cursor-auto rounded-full text-blue-600 text-sm font-bold uppercase tracking-wider ml-8 hover:bg-gray-100'>Fala Connosco</button>
          </div>
          <div className='relative w-[5%]  h-[150px] z-0 bg-gray-100 '></div>



      </div>
  )
}

export function Servicos({data}: any) {

  const loadServices = () => {

      return data.map((el: any, i: number) => {
          
          return <Service data={el} key={i}/>
      })
  }

  const Service = ({data}: any) => {
    return (
  
        <div className='my-10 '>
            <Image loader={myLoader} src={data.imageUrl} alt={data.name} width={300} height={300} className='w-[300px] h-[300px] object-cover rounded-sm' />
            <h1 className='text-xl font-medium text-blue-900 text-center py-4 border-[1.5px] border-t-0 border-gray-300 tracking-wide'>{data.name}</h1>
        </div>
    )
  }

  return (
      <section className='mb-12' id='servicos'>
          <div className='relative  md:w-[95%] lg:w-[70%] m-auto pt-20'>
              <h1 className='text-3xl font-bold text-blue-900 uppercase text-center mb-8'>Serviços</h1>
              <h4 className='mb-10 text-center text-base tracking-wider'>Caso tenha algum interesse não exite em nos contactar!</h4>

              <div className='flex flex-wrap items-center justify-center md:justify-between '>
                  {loadServices()}
              </div>
          </div>
      </section>
  )
}

export function Contactos() {
        
  const Form = () => {

    const [isFetching, setFetching] = useState(false);
    const [error, setError] = useState("");
    const [sucess, setSucess] = useState("")
  
    const onFormSubmit = (e: FormEvent) => {
  
        e.preventDefault();
  
        setFetching(true);
        setError("");
        setSucess("");
  
        emailjs.sendForm('service_8kjrn8i', 'template_g7ucczx', e.target as any, '2B4WCfsi8-krgrj-1')
        .then((result: any) => {
            
            setSucess("Email Enviado com sucesso!");
            setFetching(false);
  
            const target = e.target as any;
            target.reset();
  
        }, (error: any) => {
  
            setError("Ocorreu algum problema a enviar, tente de novo!")
            setFetching(false);
        });
        
    }
  
    return (
  
        <>
            {
                isFetching === true ?
                    <div className='fixed w-screen h-screen bg-gray-700 bg-opacity-40 z-[100] left-0 top-0 flex items-center justify-center'>
                    
                        <div className='w-12 h-12 border-4 border-t-blue-800 border-b-blue-800 border-l-transparent border-r-transparent rounded-full animate-spin'></div>
  
                    </div>
                : ''
            }
            <form onSubmit={onFormSubmit} className='bg-gray-200 mt-8 p-4 w-full max-w-[600px] rounded-md shadow-md shadow-gray-500 flex flex-col justify-between text-center'>
                
                {
                    sucess != "" ?
                    <h2 className='text-green-600 font-normal text-lg border-0 border-green-600 mt-4 mb-8 rounded-md'>{sucess}</h2> : ''
                }
  
                {
                    error != "" ?
                    <h2 className='text-red-600 font-normal text-lg border-0 border-red-600 mt-4 mb-8 rounded-md'>{error}</h2>: ''
                }     
                
                <h1 className='text-lg md:text-2xl mb-4 font-bold uppercase text-gray-700'>Tira a tua duvida</h1>
  
                <input type="text" name='from_name' placeholder='Nome' className='my-4 p-4 rounded-md shadow-md outline-gray-700' required/>
                <input type="email" name="from_email" placeholder='Email' className='my-4 p-4 rounded-md shadow-md outline-gray-700' required/>
                <input type="number" name="from_phone" placeholder='Telemóvel' maxLength={9} minLength={9} className='my-4 p-4 rounded-md shadow-md outline-gray-700 '/>
  
                <textarea name="message" cols={30} rows={8} placeholder='Mensagem' className='my-4 p-4 rounded-md shadow-md outline-gray-900 resize-none' required></textarea>
  
                <button type='submit' className='bg-gray-700 p-4 text-base text-white uppercase font-bold rounded-md shadow-md disabled:bg-gray-500'>Enviar</button>
            </form>
        </>
    )
  }

  return (
      <section className='rleative flex flex-col items-center justify-center bg-gray-800 mt-24 p-4' id='contactos'>
          <Form />

          <div className='relative md:w-[95%] lg:w-[70%] m-auto mt-20 pt-12 flex items-start justify-around border-t-[1px] flex-wrap'>

              <div className='mt-8'>
                  <img src="/img/logo.png" alt="Jogo de Negro" className='w-[170px] h-[170px] bg-white rounded-full overflow-hidden' />
              </div>

              <ul className='mt-8'>
                  <h4 className='text-2xl text-gray-100 uppercase font-bold mb-4'>Contate-nos</h4>
                  <li className='text-gray-50 text-base leading-8 '>Centro Cultural da Senhora da Hora,<br/>Av. Fabril do Norte,<br/>4460-312 Sra. da Hora</li>
              </ul>

              <ul className='mt-8'>
                  <h4 className='text-2xl text-gray-100 uppercase font-bold mb-4'>Conecte-se conosco</h4>
                  <li className='text-gray-50 text-base leading-8 '><a target={"_blank"} href="https://www.facebook.com/GrupoCapoeiraJogodeNegro">Facebook</a></li>
                  <li className='text-gray-50 text-base leading-8 '><a target={"_blank"} href="https://www.instagram.com/jogo_de_negro/">Instagram</a></li>
              </ul>

          </div>
      </section>
  )
}


export async function getServerSideProps(context: Context) {

  const resSpaces = await fetch(process.env['SERVER_URL_MAIN'] + "/spaces/active");
  const spaces = await resSpaces.json();

  const resServices = await fetch(process.env['SERVER_URL_MAIN'] + "/services/active");
  const services = await resServices.json();

  const resTexts = await fetch(process.env['SERVER_URL_MAIN'] + "/texts/active");
  const texts = await resTexts.json();

  return {
    props: {
      spaces,
      services,
      texts
    }
  }
}
