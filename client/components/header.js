import Link from 'next/link'

export default ({currentUser}) => {
    
     const links = [
        !currentUser && {label: 'Sign Up', href: '/auth/signup'},
        !currentUser && {label: 'Sign In', href: '/auth/signin'},
        currentUser && {label: 'Sign Out', href: '/auth/signout'}
     ].filter(linkConfig => linkConfig)
     .map(({label, href})=> {
        return (
            <li key={href} className="nav-item">
                <Link href={href}>
                    <span className='nav-link'>{label}</span>
                </Link>
            </li>
        )
     })
    

    return (
        <nav class="navbar navbar-light bg-light">
            <div className="nav-item">
            <span className='nav-link '>
            <Link href="/">GitTix</Link>
            </span>
            </div>

            <div class="d-flex justify-content-end">
                <ul class="nav d-flex align-items-center">
                    {
                       links
                    }
                </ul>
            </div>
        </nav>
    )
}