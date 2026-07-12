#[derive(serde::Serialize)]
pub struct LoginResponseDto {
    pub authenticated: bool,
}

#[derive(serde::Serialize, serde::Deserialize)]
pub struct UserResponse  {
    pub id: u64,
    pub email: String,
}
