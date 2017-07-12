<template>
  <section class="footer">
    <span class="powered-by">
      <h2 class="logo-small">Weddix</h2> by Keren, Elad and Anton </span>
    <span class="git-logo">
      <a href="https://github.com/AntonPavlenkov/wixer">
        <img class="git-img" src="../assets/github-log.png" width="40px" height="40px">
      </a>
    </span>
  
    <div class="about-details">
      <div class="details">Keren
        <a class="email-icon" href="mailto:kerendot@gmail.com">
          <i class="material-icons">email</i>
        </a>        
      </div>
      <div class="details">Elad
        <a class="email-icon" href="mailto:okc.elad.35@gmail.com">
          <i class="material-icons">email</i>
        </a>
      </div>
      <div class="details">Anton
        <a class="email-icon" href="mailto:pavlenkov47@gmail.com">
          <i class="material-icons">email</i>
        </a>
      </div>
    </div>
  
  </section>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style lang="scss" scoped>
@media (max-width: 650px) {
  flex-flow: column nowrap;
}

.logo-small {
  font-family: 'Rouge Script', cursive;
}

.footer {
  font-family: 'Handlee', 'Arial Narrow Bold', sans-serif;
  position: relative;
  width: 100%;
  background-color: #E5E9F2;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-top: 1vh;
  h2 {
    margin: 0;
    padding: 0;
  }
  i {
    height: 10px;
  }
}

.powered-by {
  text-align: center;
}

.about-details {
  align-self: center;
  display: flex;
  flex-flow: row nowrap;
  @media (max-width: 650px) {
    display: none;
  }
}

.details {
  height: 30px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
    margin: 5px;
    text-decoration: none;
  .email-icon {
    margin-top:-14px;
    display: flex;
    justify-content: center;
    align-content: center;
    
  }
}

.git-logo {
  align-self: center;
  margin: 10px;
}

.git-img {
  cursor: pointer;
  border-radius: 50%;
}

.git-img:hover {
  background-color: grey;
}

a {
  color: black;
}

h2 {
  color: #324057;
  font-size: 2em; // font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}
</style>


