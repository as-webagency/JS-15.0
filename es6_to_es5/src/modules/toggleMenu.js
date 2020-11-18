const toggleMenu = () => {
    const menu = document.querySelector( 'menu' ),
        body = document.querySelector( 'body' ),
        navLink = menu.querySelectorAll( 'li a' ),
        serviceBlockBtn = document.querySelector( 'a[href="#service-block"]' ),
        idServiceBlock = document.getElementById( 'service-block' );
        

    body.addEventListener( 'click', event => {
        let target = event.target;
        if ( target.closest( '.menu' ) ) menu.classList.add( 'active-menu' );
        else if ( target.classList.contains( 'close-btn' ) ) menu.classList.remove( 'active-menu' );
        else if ( target.tagName !== 'MENU' ) menu.classList.remove( 'active-menu' );
        else return;
    });

    navLink.forEach( ( item, index ) => {
        navLink[index].addEventListener( 'click', event => {
            event.preventDefault();
            const hrefId = event.target.getAttribute( 'href' ).substr( 1 );
            document.getElementById( hrefId ).scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        });
    });

    const scrollTo = ( element ) => {
        window.scroll({
            behavior: 'smooth',
            left: 0,
            top: element.offsetTop,
        });
    };

    serviceBlockBtn.addEventListener( 'click', event => {
        event.preventDefault();
        scrollTo( idServiceBlock );
    });
};

export default toggleMenu;