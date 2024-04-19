terraform {
  required_providers {
    ns1 = {
      source = "ns1-terraform/ns1"
    }
  }
}

variable "custom_dns" {
  
}

resource "ns1_zone" "zone" {
  zone = var.custom_dns
}

resource "ns1_record" "www" {
  zone   = ns1_zone.zone.zone
  domain = var.custom_dns
  type   = "A"
  answers {
    answer = "185.199.108.153"
  }
  answers {
    answer = "185.199.109.153"
  }
  answers {
    answer = "185.199.110.153"
  }
  answers {
    answer = "185.199.111.153"
  }
}