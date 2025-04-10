## Prerequisites

- Git: [Install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- ASDF: [Install ASDF](https://asdf-vm.com/guide/getting-started.html#_1-install-asdf)
- Docker: [Install Docker](https://docs.docker.com/engine/install/)
- Docker Compose: [Install Docker Compose](https://docs.docker.com/compose/install/) (Usually included with Docker Desktop)

## Setup

1.  **Clone Repository:**

    - Clone the repository.

      ```bash
      git clone git@github.com:noexanu/web-template.git
      cd web-template
      ```

2.  **Configure Docker Network:**

    - The services in this project need to communicate over a shared Docker network. You must create this network manually before starting the services for the first time.

      ```bash
      docker network create template
      ```

      _(Note: If you choose a different network name, you will need to update the `docker-compose.yml` files accordingly, but `template` is used by default in the provided configurations.)_

    - The `docker-compose.yml` files within each service's repository are already configured to connect to this external network named `template`. You don't need to modify the network sections unless you changed the network name.

3.  **Install PNPM:**

    - Install tools from `.tool-versions` file.

      ```bash
      asdf i
      ```

4.  **Build and Run Services:**

    - Build and start the services using Docker Compose.

      ```bash
      pnpm run docker:start
      ```
