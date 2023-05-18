import { HeaderContainer } from './styles'
import logoIgnite from '../../assets/logo-ignite.svg'
import { Timer, Scroll } from '@phosphor-icons/react'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logoIgnite} alt="Logotipo do " />
      <nav>
        <NavLink to={'/'} title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to={'/history'} title="History">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
