import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Cadastro from './pages/cadastro';
import Banco from './pages/banco';




function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Cadastro/> }/>
               
                <Route path='/banco' element={ <Banco/> }/>
            </Routes>
        </BrowserRouter>

    )
}

export default RoutesApp;