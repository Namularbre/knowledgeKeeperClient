
/// Fetch degrees in API/Database
pub struct DegreeRepository {
    degrees: Vec<Degrees>,
}

impl DegreeRepository {
    pub fn new() -> Self {
        Self {
            degrees: Vec::new(),
        }
    }

    pub fn fetch_page(&self, page: u32) -> Vec<Degree> {}

    pub fn add(&self, degree: Degree) -> Self {
        self.degrees.push(degree);
        self
    }

    pub fn remove(&self, degree: Degree) -> Self {
        self.degrees.retain(|x| x != &degree);
        self
    }

    pub fn update(&self, degree: Degree) -> Self {
        self.degrees.get(degree.id).unwrap();
        self
    }
}
