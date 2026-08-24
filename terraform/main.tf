terraform {
  required_providers {
    cloudflare = {
        source  = "cloudflare/cloudflare"
        version = "5.0.0"
    }
  }
}   

provider "cloudflare" {

}

resource "cloudflare_d1_database" "database" {
  name       = "produtos-db"
  account_id = var.cloudflare_account_id
}