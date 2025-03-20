<svelte:head>
  <title>Contato</title>
</svelte:head>

<div class = "header">
    <h1>Guilherme Buss</h1>
    
</div>

<div class = "content">
    <h2>Contato</h2>

    <p>Me siga nas minhas redes:</p>

    <ul>
        <li><a href="https://br.linkedin.com/in/guilherme-buss-da-silva-b0b93829b?trk=public_profile_browsemap" target="_blank">LinkedIn</a></li>
        <li><a href="https://www.instagram.com/bussdasilva/" target="_blank">Instagram</a></li>
        <li>Email: <a href="mailto:guilherme.buss.silva@gmail.com">guilherme.buss.silva@gmail.com</a></li>
    </ul>

    <p>Ou mande um email!</p>

    <form action="mailto:guilherme.buss.silva@gmail.com" method="GET">
        <label for="email"><p>Email:</p></label> <br>
        <input name="email" type="email"> <br>
        <label for="subject"><p>Subject:</p></label> <br>
        <input name="subject" type="text"> <br>
        <label for="body"><p>Body:</p></label> <br>
        <textarea name="body"></textarea> <br>
        <button><p>Submit</p></button>
    </form>
</div>
