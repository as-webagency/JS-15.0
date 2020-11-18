const ourTeam = () => {
    const commandPhoto = document.querySelectorAll( '.command__photo' );
    let teamFoto;

    commandPhoto.forEach( ( item, index ) => {
        commandPhoto[index].addEventListener( 'mouseenter', event => {
            teamFoto = event.target.getAttribute( 'src' );
            event.target.src = event.target.dataset.img;
        });

        commandPhoto[index].addEventListener( 'mouseleave', event => event.target.src = teamFoto );
    });
};

export default ourTeam;