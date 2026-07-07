#[derive(serde::Serialize)]
pub struct LoginResponseDto {
    pub authenticated: bool,
}

#[derive(serde::Serialize, serde::Deserialize)]
pub struct RegisterResponseDto {
    pub id: u64,
    pub email: String,
}
