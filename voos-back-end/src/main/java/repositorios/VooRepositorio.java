package repositorios;

import model.Voo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VooRepositorio extends JpaRepository<Voo, Long> {
}
