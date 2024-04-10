import Layout from "../../Layout/Layout";
import { FaAngleLeft, FaAngleRight, FaSearch, FaUser } from "react-icons/fa";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import SongBar from "../MasterBar/SongBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { userActor } from "../../states/Actors/UserActor";
import Navbar from "../Navbar";
import { useGlobalContext } from "../../states/Contet";
import Footer from "../Footer/Footer";

export const songs = [
  {
    id: Math.random() * Date.now(),
    title: "softly",
    artist: "Karan Aujla",
    mp3: new Audio("/assets/mp3/Tum Hi Ho.mp3"),
    img: "https://m.media-amazon.com/images/I/51Tps4BDoVL._UXNaN_FMjpg_QL85_.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "yaad",
    artist: "Karan Aujla",
    mp3: new Audio("/assets/mp3/ae.mp3"),
    img: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/53/fc/12/53fc12dd-e441-88b0-b539-b5e4728bb5c9/198391098505.jpg/1200x1200bf-60.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Kammo ji",
    artist: "Talwinder",
    mp3: new Audio("/assets/mp3/Mashup.mp3"),
    img: "https://i1.sndcdn.com/artworks-A7IxasTc4lhyqCq0-zXbZgw-t500x500.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Sagar Di Votti",
    artist: "Satnam sagar",
    mp3: new Audio("/assets/mp3/Judaiyaan.mp3"),
    img: "data:image/jpeg;base64,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",
  },
  {
    id: Math.random() * Date.now(),
    title: "Heeriye",
    artist: "Arijit Singh",
    mp3: new Audio("/assets/mp3/Heeriye.m4a"),
    img: "/assets/Arijit-1.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Pyar bolda",
    artist: "Jassa Dhillon",
    mp3: new Audio("/assets/mp3/Tu Hi Hai Aashiqui.mp3"),
    img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFRUVGBgYGBgVGBcVFxcaFRcYFhgYGRYYHiggGBolGxcYITEhJSkrLy4uFyAzODMtNygtLisBCgoKDg0OGxAQGy0lICUtNS0tKy0vLS0tKystLS01MC0tLS0vLSstLS8tLS0tLS8tLS0rKy0tLS0tLS0tLS0tLf/AABEIAKgBLAMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAABQQGAQIDBwj/xABGEAACAQIEAgcFBAcGBAcAAAABAgMAEQQSITEFQQYTIlFhcYEHMpGhsRQjQsFSU2JyktHwFSRDgqLhFhey8SUzNFRjg9P/xAAaAQACAwEBAAAAAAAAAAAAAAAAAgEDBAUG/8QALxEAAgIBAwICCQQDAAAAAAAAAAECEQMSITEEQVFhExQiMnGRoeHwBSOBwbHR8f/aAAwDAQACEQMRAD8ApKITyNgCSQC1lG7WHIVf+lHs8GFwSzCUM8d+ssCRKZHVYgg5WuB61D6G9JGhws+HATtEnNIy2USJlYKpGuiX5+RqwYnphIVCN1QyjS7JlVwc6sv4QyKBa+3vG9B3c2TNrSiqSfzPKmBBINwQSCDoQRuD41i9WPp1xd8RiFLizRxqhsQVNyXzDLoCcwv5cqrlQbINyim0F6KKKBwooooAKKKKAM3ovRRQAXovRRQAXovRRQAXp90Q4T18uZheOOxN9mb8K+PefId9IDV74fjDhcIhSNZBcl2V9LnmTb0t4VKOf+o9R6LFUeXt/stZJrGtLuCcTedM7RZB+HW+Yd9Mdac8uede0G/2hfBB9TVVarN7Qm/vQH/xr9WqrNbuqiXJsxL2UYJPhXJ7nnW58q1yXI0qByTGLAAi9APhWXDd+lCobb1BIX8K54gnKa6EeNc8UOydaBo8o6LsKmwjQVBj2FTIuVSddE7DGp0B0pdAdKmYZqkiS2HmAbSn2Cbaq5gm0p1gpNqDNJFlwrVjiPGkhVmZkRUsGeQ2GYjMqKLjM5HK43GtRsLJSjpVw5sTh3w6v1bmUSqxBOZVBYgAbm/Zt5d9MjJNFh6M9J48VGkilGVsoOWwaNn91JEucpPI3N7jarIK886K8EbDPiFMgY4h4SqKCBEImYM1tgNLggDUrvXoCtUlJ86Q4l0DqrFQ4yuB+Ia6H4n41tLjpGvmcnMSTtqSnVk/wG1RzRQep0olrhpZRLMFLCPK0rdkZc5yqSNL3I5Dzoj4ZM0LYhY2MKMFZ9LAmwAte/4l2HOmWG4zDHgpYI4n66cIJXZwUtG5cFVAuDra3rc823DemUEWFTCHDM0RikSU9ZZmaXVmC+7uBYnUDbxVuXgUynkXux7/AE/OCvcK4BicSrNBCZFU5SQUUXtfKMxFzbWwrHC+BYnEFxDEz5LBtVUAnQC7EC+h0p10Q6UxYSJo5Y5JQz58oMRjbshbMjqSu26m/wAK16KdJ48KZs8UmSVwwjjMZjABYhCki6jW2YEGwG1Q3LfYiU8q1Uvh5/UQ4bhk0k3UJGWluy5Ba90vmFybC1jz5VHnhZGZGBVlJVgdwVNiPjVj4L0miw8+JxC4ftSgrEivkWJXa7jMBe9gtiALWO16X9KOKJisQ06RmPrApdSQe2BZiCORsPnUpu+B4ynqpraufM04X0exWIRpIIWkVTlJUrowAa1iQSbEbDnUbD8OlcSlUJ6lS0uwKKuhJBIOhG29P+jHSeLDQGKSGSQjEDEIUkEYzKiqoY2va6m9u+ufCOljQy4ycp95iVfLYKVR2YsCVb3lF9qi5b7CueW5UvgK/wCw8R10cHVHrZVDol1uysCwIN7bKTqeVcF4fKY3lCExxMFdriysxsARe5ue6rHL0wVuIYfGmNrQxqjKCoLELIpItoBd728Ki8G47AkGIgnikkSeRZPu2VCMhuBc+NqLl4BryVdeH+d/oJYMBI8ckqoTHFlztcWXObLcE3Nz3V24TwafEsVgiaQqLm1gADtdmIAv5004JxvDxR4qCWKV4sQyWCOqsqxszKCx3Oo18DWvBuOQRJicPJDI2GncMAjhZUyMSgLbNpYHy8alt77EynPel8PyxbBwXEPOcOsTGZb3jNlYZRc+8QNtd9eVcsTw6WNEd0KrJmCE2FzG2VxbcENoQQKsUXTH/wARbHNEbZCiopBIGTIpLHc8zUbpX0oONjw4aPJJEHzkWyuz5bso5XKkkd5qLlfBCll1JNbdyL0V4WJ57P7iKWaxt4KL+Zv/AJa9AXhMIiMISyHcAnXnvVK4RgnOClKIxd5FtbS6p3HwOarIJS2F6oxzKwUAkAA9xsb61ajz36llc87XZbDnCQpGgjTZRYC97V2qrdGMLKkhDRAIAQJGGVz5i+tWi9SYDzLp+397Ov4F/Oqyx8asnTxv7237q/nVbPlVMuTZj91HMkd9bwWv32FaN5CuuEQhSbbmlHNmKnmay2WssddqzfwoJNDlrWe2U2rMkwG+nqK5S4nMLAE37qCY8nWE6VKhOlQIxJa1gPM1Jw2GdiFzG/cotUnUWTwRNjlAGpApjgpgwsoJ9PpUaOCKDkGbnfW3hUj+1htyta23ntQkZMvV06Q84ZHfQvGDyBb+tan9QyHtE+g0qopLGpDKOYvqTvVywuIzxEHddjQ9ihZXJ+0S8JN4mmRAkXK2o+FIIZtaZQz1KLZYvAccKgWFbLm11JJv/sKaDGabikMWIrt9oqbKXBnixooopj0oUUUUAMuH8OjmQ/fxRSKdRO2RGU7FHCntA3BU+BHMVI+wYSLWbEde36rC3yn97EOLAd+VWNJaCaihHFvuWXhcZxSYkLDFHHHCCiooGV2ljWMtK13Y2z3ZjsDsNKUS4uOO4jjSQDd5QxMltyAGHVp3W7XMnkH04bB8MEZBSbHOSwIIYQQ6AG+2Zmv5OaVdFeE/acSiHSNfvJmOyxpqxJ5X29aVPl9iqLVSk/d/19zTpPw1cPipIVvlXKVvqQHRXAJ52zW9KV0846z4yXF41RaJXQXJsbP93EAOZsoJHK9Qn4NMHhQJmfEIkkSqQSyyXy+R7J32tTJ7blkJeytT37/IgUU0xXAJo0lkbIUhy52V1Zbu7RhVI95gysCBtatOI8L6lAWf7zNldLaKcgcjNftMoZQ2lgXAuaLRKnF8MXUUUVI4UUUUAT8J0gnjUIk2VRsLJpc3O47zWf8AiXErtOddTop1+FJsvgK2vysKSzy84qUm/Ebt0oxf69vgn8qynSnFfrz6hP5Uk9BWwby0osXRHwOvEMSZHLu5ZjvUNj4mt9aEjZiFVSxOwFyT6CoG4I0gHK5+NS4wQoA+dME4OFIEsgU6EqoLsL7gkaA/GmuC+ws2VlYeOY6+g/lUEWV1QfCo3ElYhQNLnW1XxouGLoT8c/PWk3SEYM9WMNqc3a97a3j41F7jxi20qFCYYAABRtqTrXTqdP5aV2QUMNKY7scSSOCxi4prwuBiWKC7KpI+n+/pS7LVi6LYhlkkCj3Yv+pgCfO2lJJ0U5vZg/MrONwcgAuCWPIfU+NR2wki6mr/AC33sDVb4zhHN2X4Gojks5UsNCGLEkEDxFXvheJ1ceF/iK82LnrBfQhh9auuBkyzHXdB9NfoaskUDcTjcbGpceIpU7WLAc9R5H+rUCa1FnSxPXAsEeKrt9r8ar64muv2mpB4ymUUGinOyFFFFABTzhWAbrooI/8A1MzKM36hW1uByly3Yn8A27WqruEreZezmyh3C75jHG0irbnmKgW8afcPZ8JE8zZjjcUCkKWPWIjn7ycruGfZdLnU6i9LIqyy7L8+3iHSri2HmxLKyOYoAIYmicKxSPQ3DqytdsxuLbi96gYzjo6k4bDRdRC5BkJbPLNbbrJLDsj9EAD40pxGHeM5ZEaM22dWQ22vZgDbQ/CuQN9tfLWhRVBHFFJLwLQiqeFxIHVQ2Jkec5hmXIioihL3YkG4UDcctTVi4jMIsbOkNhLhuHxwQhmUZWOUkhmsLqkpN/A1XOjeCT7ZFDlRijZp5HAdUWLtyKgPZAFspcgkk6W0us6Q8UXFTPNkys7ubjYpcdXcfpgaEjcW5i5WrZTo1Trtz839q+BYMaEPC4YUlTKJ269wV0EamwVNCwJclQBdj2jbMba9I2GIwmHnaPLiJp3SEITeSIGxZ0vlMhkIBcAX0O1U23xqx8c47HIsPUhwY8OkADAARWBEhU3OZmvbNpYeJ0nTTGeJxarxb/PzhCbHqitlQ3CgKWBuHYXzMP2bmw71UHcmo1FFOaVsFBoooAsAwPDf/cD+Oj7Lwz9cP4zVWOGGtY+ziqaficX1MtQg4X+t/wBTVsq8LH+IPi9VT7OKBAKK8w9ULcqcOZWZBny72zc9t6RY/jaRqVhjVAdCR7x8Mx1t4VDuwTIug1YnzsPoB8aiOoCi+p109aZIw5Y6ZaSPJji34T8z+X51pFiyGDc1N7/kf65UTsdw3oWNdMLruN6BSTjcUDZ76MPHQiwIrvgXzW20BPjrUiThJaIgDutbcHl9betcsHhimjAqb2swIIsOYOooN/Stzml4ExRWG/OtlFYYVB2aOV9amwxym4hvmKkmxINkNxa3nttrUILrTbA48wAsNCylL2va9jf5UkzPmjeN2bcTinEcZIcOUBZQxWxPfb4+tQOHLOSc6EKOeZjf0NWTiXFUZiUJJOq3Fha/eaV4vjWYZSNR3VVqOdpRVOkIAe/OxqbgOKXEb817LeP9a0k45iLuaj4GWwIrQl7Jiye8X7EYnsq3IaX/AGW2PpYVpLMO8UjwOJZoym9jpy0O4/OukGEd1AupcX7zcDv038qhF2HLoY4E1dRiKpsk8kTWzfUj513TjrW1ANPRpXUw77E80UGinOyFFFFADwz4BiJCuLjfRjHEYerDbnI7dpVvqNCRWuL6QntDDxjDhvecM0k8g558Q3at4LYedJaY9HuGHE4mKDk7jN4IO05/hBqKS3ZW4RSuXYdcTYYTD4IIP7yYS98oJiWaR3GUH/EOawNrqFa2rAjTpliCJcLnIbExQxmcnfrAxdVcjdgtgfMVK4r0jwrYqWZI5s5OVJQY26tUGRTFGwsNBcMTfXS1IOK8JZDEyMZlxIzRNYh3bNlZWUkkSBzY6m9wbmkj5lONbpyVPf8Am/6X3Os/FY1SZYFdTiD948hUsEvmMSZfwlveY6mwFhz7JwRVwqzSZs8qSyRgEAJHEModtNS8rKoGmhv5Z410fbCSIjFZWzKjIRlGaRbqAVYnXtdxBUG2tOelMb4jHDh+HUKsSxQ3ufdhTOS55IhZjYDUi+py2m/ANa20PblvyRVuB8MbEzxwqbZzqx2RVGZ2PkoPyrHGIY1deqDBGTMA5BaxdwhNgLZo1R7ft91W7g8EOFwuLxKfehUMCOytF1nXSBCQA5ul1NmGVrA35GkcPBWmjGJmkKtiHZYVVAxfqxZ3IzAJCgGXS+1gNrmrclZbk32W38/nyK/RTPpHwsYWdoA+coqZza1nZQzKNdQLjWllOnZojJSVoKKKKCTZVvpWzQm9ra91aLIV1XcbXrAxUufOcpa1ttPrSPkom6fBh0INjWEFZklZiS257tvnQBUEIgYyQgga6jT1Ov0qI+tr3+A/Om8sSuLEHwI0tUTEcKuAQ7G+4OXS3prRaOT1HTSUnLsKupBawNyeX/arVw3hRVVJt4juqHw3AhNba9/OrBDLYXJAA5nQVXKfZCQw92Tp4yIuxe4sdBSeaNuwxFr38Rp9PeGlPuF40G4Go21512GHiCFWUMDZgTuOWhG1LdmnBNYpFYFaldaeY3CYZEjsZDI7sAuZT2Ra593QXPyrbgOAjnkYlSsSW7yZL6gZtdLbkDmLHW9OntZ0PWsdWV6XsgsdAOdcIJ2mfqlW99ANyTvXpGPSMqIciiM3ATKQvz1J8aWcI4RDh5usS47BVVN2szaMwY6+7cf5jVblZmyZ9apFfwWEkRZYSoZoiCGXKSUcWBVmGtip+NK8ZBkBY3DNpYkknw1p1xwoZcocq5GbsXBCk2APKxy3t5VXJHz4g+8VUgLc32AufjUrcxPZCDiC3Y+FRUcq21POLYTK2nP+V6h8MwOeZeY107stt/jV6kqMjVssPRjhBYhnY2PL+dWjiPRePJnhZg6C9r727hyNduH4cKuld5ZCAazOe5q9GqKXxCPOraDrFGbMAD1g8bcx3iqvIhB2NXeHClWZlJBaQW1sFvoBflctUHGcfkjdo5IY86mzZlF7jyNvhVsJNCaUzQ0UUVeeiCiiigDpBCXZUX3nYKPNiAPmasXB+LYXDJiCiyPMydVG+YLmVzaV17JEWgBW4Y6772r+DxBjkSQC5RlYDvykG3yqSOGhj93LF1fIySJGVHIOrHNceAINtL1DV8leRKW0uDOF4eszKkDHrGNlikFiTbZZVGVvNglWri2NTA4rAREEpgkYM+U2eWUEyMgPvBWynTuI3FJ4OKRYNWGFbrMS4KtiCCqxA7rArC5J5yEDwFJsNj5Y75JGAOpF7qSeZU3BPmKWrK3GU3vx5+Y64Vxd0khAmkkSKTr52VnUMMylrBrHKADuBmaRhba8mDjkKz4xhIb4pZwJyjdgysCqqg7QFr3a1ycugC3auYjHyOuVm7N75VVUW/eVQAE+JqNU6RvQp8lm/tfDnAnC3dAs6uAFu8qBCCSw7KOX110VcoGbLrIbpDhzLgpiDbDpEnUqpyxZHJkcE+/2bZQLm9iSCtjUaKNKD0EfP/o449xBHlnaNi/XyM7OVK9gvmWNQdQNrk2vlAtYXZPRRTJUWRioqkFFFFAxkVi+tFYG9LIWRgnWsoa1ahKUrT3Moa7RyAbgkEcu/lvUY11sQpe2i2Gu2ZjZQfX5A1DVizrS9XAHF2bLkYN42t8QTXBsPKzAyMB3DWy+Q5nxqfJiUKogIzkkZmcC4Crrc2AOa+niO6uXFMW4svV2G9zYgjlYgnmN6VwceEcp13ZOSfq1AB2qHjeN6qL7XpTJijkLGw8qSpKWe9/69aIY7FnlSos+D4kWZpCWuRYZdyP0AeS+I310758GNxEQAWVIwLkRqoAF99t7+d6WcJiZiXbNrsRbTxJP038qlyxoNDIw8gAPW2v1q9Y9i+DhJe22hlhukrg2lOh5jtL/ADFWDC4gOobQg7GvO8WhU2zH43BHfruKadEOL5XMLbHUfmBf4/Gs2THQTjpfNpjfjOGYTGVmuCuUCwFjck7bkk3udbmoIwZVQ2xuT8datONhzx6akaj01qqcSxmhG3d3UkXZVPYU8afNn8Arj0FiK36GYa7M/K9h6UvxcwJXxX4jVT9KtvRLDZYhVknUSjGrkWWMWFRsW2hrtK1hSzFzi4Xv19BVBqZwjF2lzEBQiNYgm5DDa21rjXxrnxXoVLiJDMs0PbCmzlgw7IFjZSNgOdcOKTDMwBIZFVgAbXUggkd+21OWxZIWzW7Iq1OhEnyipmiiitR3QooooAyikkAAknQAC5J7gBvXZsDKGyGKQPa+Qo4e3flte3jXofsxwjDB4ufDIr40HJGGt2VyqRbNoLkt4EoAdqs/RyTHDEM/ETCPs+FzAoELDrWuzPl1BtCdFsptpe2kmHL1eiUkktvPf5Hic+GdLZ0dL7Z1Zb+WYa1k4WQJ1hjcRnZyjZDfbt2t869xxzIwweExj/ahiJDIsrRpHGerHWIll0ubqLfiBa+9q2hxGLWbGNjhGuAClYlshzgmygAanMuhVt2YACihPX3Xu/Xnettjw2DByuCyRSOo3KIzAeZUWFYw2DkkBMcckgG5RGcDzKg2r3vgsEoghhCTYIwxD3RBJE3ZF8xOYmxuT7pvfU70cEgmEUcDCaB1uzSoIWjmY3LO9wxBcksQQDdjrzoFf6hV7L5/n0PBocDKwusUjDa6o7C43FwN62HDp/1Eum/3b6eemle7YGKWPBxhZMRK7vJIZcOMOWcO7uGIn7IUhhYDaw5VEDY77FK+GzNiZMQwBm6nMqxuITnC2j92L8PfzNAevtvhc1yeFuCCQQQRoQdCPMHasVfPbBiYnxUSrlMscdpmT9IkFVPiO0bHYMKodQb8OT0kFKqsKKKKCwKKKKANStZRaZYDCI494g89gPidNe6pKw4eJryZnA3AtbzvfW29tjbupHFpWURmpSaSe3kL+H8OMpNtgNe86gG3lcXPjzrnxxwIjEmwkB8SEB1+NzWvGOMyRvYG2UAKV90qdiO9WBPxNI8Vicy5kJtvlv7pGtv5U6Sq0ZZ9Wqlja54I+Obsoe5j87Cp2AJbrLfsr4dm3LbmfjUXFyZotNrg/HWmfBQgzXGh13PgaGzFHDNySW4p6RpkZYwzHshmvawJ1AAA7rfGp/Rro67ENKMq7gEqrP3AAm/yppw7hQkLYqQL2ierU7WGmYjW40sAe6/dXTHgk9ok38bipSVB6FxlqkiZiZVUheqQBd1PWgnzOYa+lJOJw6GSNrrexDL2kJ2vbRgeR+QqSkgeyOTm2R7/AAVu8cgeXlS8yspINmU6MGFtLg2JG22/hSzjW6Ztk8eWFJU/IgnEkgqw0AJBHLUXFjypeMSUlV1Nypv/ALVMxdkkYZdFZl17gSNfSl2Ij7RHdU87nLlJpUes8B4mHRTfQi4pd0m4DnPWpodyBsfGw51X+i85jjS50dpAvgY8hI9Q9/Q1fsFiQwFY5JwkaYtZInl2EgM0yRLeyXuSLHcltOWptavTcBhRGoHcK5z8OjWUTKoDN2WI58wT9PhUmWSwqJ5NRMMekj4qTck2A/KqUnGhJKzk9i4F/wBFb2BPhzv51O6a8Vyx9Up7Um/gnP47fGqRBKVJtbUW12IPI1djx2rZRmyU6Q64/wAQYYgfhKhV3vcAtz/zVZ8NiuyNeQqicRfMsbc7ZTb9nb5U94VjPuxflpUZY+yqDFL2nZNoopx0Q4UMVjIICOyzXf8AcQF2HhcLl/zVoPQSkopt9i29BPZx9oRcRiiyxNqka9lnHJmbdVPIDU73FejQ9C+HqLDBwkftIHP8TXJp3ICEOQC4Byg6LcDQG2wqkH2ddYxmxGOxLTnXNGwjVT3ItiVA5C9ScGXUSyyblOl2SEntI4Rg8CglwzSYbEubIuHdkDLftFgD2VHhbW29TvZZwRJsHJNOGkbESPcs7nOiAR2ftdsXD799Uv2lcDxGGnV55mxCyLZJWFmtHYZGA0BF76b3J3vXsfQ7A9TgcNHzESk/vMMzfMmgvzy0dPGpW2+f68TZ+jGEZFRoFZEtlVrsq2FhlUmy2HdSb2h8Ow68Pnd41YohEZe75GeyKVzE2N2G1bf8CIxdpcXi2Z2ZjlmaNVzEmyoNgL6DWvPPaL0VmwYVxiJpsPI2W0jsxRveAYXswNiQbDUeVBV08YyyJazPs54S3EDNDPiMT1EaL2FmcLdyQAVN1tZW0tVs6RdARHg5RhsRiyUQlYmnYxsF1KdWLDVQQB5Vp7EcJbDTy21eXKPERoLf6nb516NegbqeolHO9L2T4Pnvohh8bjJkgixOIVAAWYSyBY4xpoA1vAD8ga9W/wCX8Nrfa8dY3uPtLWNzc6W5kk+tOuA8BgwausK5eskZ2JtcliSF/dUHKB3DvJNduP4zqcNPL+ridvVVJHzoEzdVLJP9vZHzTjFQSOI/cDuEvqcoY5bnmbWqy8O9nuOniSaNI8kih1zSAGzC4JFtNKd9EPZqmKwkWIknkRpM3ZVVIsrsoOuuoF/WvXcDhBFFHEvuxoqL5IoUfIUG3qeu0ezj3a5s+YcRCUdkNrozKbai6kqbHmLiudegdN+gEWCwxxAxEkjl1UBgoDFzqSQL7Bj6V5/UG7FljljqiFFFFBYRuIYkol7XF9Re1vHY1EXi6OuR8yt+FjbX9ltfg3x02nYxLow20+mtVmeJRrnB+FTZyutc8eTVF8k6SdWHVyGwF8rc0J3HeVJ5etL45ip7xsfEf1zrSE9oAa67EXBvptTOHhQJJYZRfQXubflS7RMKU80tluaQunVsLttoRY89iKcdHsK0oCpYluzuLi25sddBrVgxXQ2L+zjiI83WBA2UAEHtAEbXOl6V9D8P1MDzNoz3VB3KNGPqRb/L41X0/UYs96ezp/E0wWXDkS52HmPiyKFW2VABoysQBpqAb+tKXfv1BolnN8wNiNjXORwwzDQ/iHIeI8D8q1NKtjdDqvSft5EtxZioyDzrviVzDrOR97wa2t/P3h5+FbSJmHlS2TFAK+pG2n6ev5Gx+NJ2Mb/YyU+P6NOLNdUfzQnvKWtfxykD0pHI5Juf6tTF8Qh1yZv3ibeiqfzrQ4g8gi+Sr9TrVa2MmVa5OSLBhMITwjrV3hxOf/KVRD8yvwpn0f4oHA11pp7O4BiOHzRSXKvJIp7+0iajxG/pVMxXDZcBKUl0APZb8Mi/pKfhpyvS5IakVYsmmVF+OINta443GBULMbBRc+lLMBxRWW5N71W+lfGc/wB0h0Bu3mNh6VmhjblRsnkSjYp4njDM7SHc/IDYVFtoCNwf+xrRXrZVve2/5VtSowN2byNceutMcO2VbUpVqckfSkyD4x7V09kLqOJLfcxSBfPsn/pDVS6kcPxrwypLG2V42DKfEd45gjQjmCac9Jlhrg4+KPofpm2JGDm+yAmawy5bZrFgHK3/ABBc1vlrSj2YYXGph3OMMl2e8azMWkC21vmJIBPI93jSrhXtbw7IPtEUkb88gEiHxBuGHkRp3muHGfa5EFIwsLs/JpbIg8cqks3l2fOpOKsGfS8Wjvz9zPteLYiTCYKFesmZmkyjcC2QE/orqxuf0a3PQviWGwyx4PHEkraSNjlUHf7hyCU7raX1NxtVR4DNxUyNxOFDLmzdYzFMrKnvIUzBgBlFgLWsLV6H0Y6eti0LJgZ2KWDdU0LICRcANI6E6a2tpegvyRyYoKMaaXPHPnf0MezjgGNw3Wti5S2fLlQyNLYi92JOgJuBpvbXlUH21cRVcLHBcZ5ZA1uYWMElv4io9T3VP4t0zxAhEuHwEhVyqq8zwquaRhGlljdi92IG43ve1ed8Y6K8YxMrTTYd3dtL54QABsqjPoovtQLghqy+lyNL+V2PUPZlhOr4bhxzcNIf/sdnH+kikmC6VZON4jDu1opAka3OiyRxhvS+Zx6LXPhvSDikUQhThiEYdVjP3ydnLGpFxffKVOnfXnJ4Vi8d1+MjgLIzyO7AqApPbYDMQWsCNhQTjwKcpyyNU/Nct7dz0zhnSc4/iyRxH+7YZZHuP8V7dWHP7IznKPXmLNPapi+r4bMOchSMf5nF/wDSDXm3QGbGYVJcZBhBNEVKtI7rGqiPtORc3I2v+7T7pIOK8Tw6L9hESBxIPvFDNZWABRyCB2r6jlQE8EY5o00oxruhX0H6ZY0zYTBIYxFmSP8A8vtZF1bW++UHWvUOm/GGwmClnS2dcoXMLi7Oqi45718+YvCzYeUo6vFKnLVWFxuCORHMHWtJcZKws8sjDuZ2YaeBNqDTk6KGSamqrv5jjpF0xxWNjWOdkyq2cBFy62K66m4sTSCiioNsYRgqiqCiiigYwwuCO+oXR/oZPirG3Vx/rHB1/cXdvkPGpxq8Z5mRFAYEDU7eQp4Q1HH/AFbJoUdvH+jlw/oJgolA7btzZjYn0GgHhU4dFsKPwn+I1wkklYpcOAAQ1u/vrSYT5PxWzad+Xxp/RI4q6iS4sdYiNFwjx3KqVZARuL3Ase+qhjOLSrZUcqqgALysNNRsfWuvF+OHRNgNsynXvN7/AJVX1xnbvIA6eF1PmLHeuT0HQeijJz5k268D1MOpxQVNWyZj8UZUKsFzAFlIVVPZ1I7IFwRffnSWCbKbnY6Ed4P9XqfLNlkBRg2X3SBvcX90/Aik2MxQaUlFype4X01Hle9vCt8FolS4MvW6bU4mcbNe4BAUaXJC38daTM6A9pmb90AD0LfyrWc3a5ri8dMYM2aU3Zv1i3NgQDsN/O5/2reQIPx3PcoJ+ZtWiQFhtbz0rllOvhvUFOp0eqeyWZTh5lB1Et7G17MigH4qa29q0AfDp2hnVwQtrlgwKmx5a2rz/ozxWXCyM0Zt1iMhvtqLhrd4I086YcU480kfaJZhYZm1aw0A+ZNMihp6rK0mLcCwYgVwreTetKgewrZWI2rWs3oA6vIDy1rvHOSNaiKakCTue3gQfyqGkyU6LfRWKzQerCiiigD1v2K4sPBicO2uVg9v2ZVykfFPnWOkkw4RwtMHC18RMCCw31H3snfzCL6d1UDon0llwErSxKr50yFXvb3gwOnMWP8AEa5cd6QS4rE/aZQuYFLJrkCobhRrexNyf3jUnPfSyedyfu8/Fo9pxmEyLwzCAaCSMkfs4aB3/wCtUrPSDHxCYq2NxUBUAFIYgya9q+ZoHubEbNy2rzOb2lYpp45zHBmiSRFGWTL96ULE9u9/uwBrzNTP+bmN/VYf+GT/APSoMvqWbZ19Vzf8lm9mHEzNNxBWd5PvFYNJYOy2eIFgFUA5Yk5Dyqz8CwuHw6Dh8ZuY4QzDvEhYFj4swY14l0b6WzYOeWdFR2mvnD3tcvnuLHvJ+Nd+G9N8RFjJsZlR3mBVlbNlAupUCxv2QoAqS3N0U5Sk48Uq+K/GX3pJj0wC4DhsCGXtRs6ILu6I9zp+k7gt3dlr6VYVxsOMcCDFzQzRi5jAyNa/+JBMmovpe3rXjQ6YYkY1scpQStpYrmQJYAIAdQLAagg766mrBifa1i2QhYoUYj37M1vEKTa/negXJ0eSlS37u+75tFV6WQyJjMQk0nWyLIcz7ZrgEG34dCBl2FrcqU1vPMzszuSzMSzMdyWNyT4kmtKg6sVUUmFFFFAwUVmsUAbxJmYKPxED4m1X3DYV+sRDiQzHtFVF7KDa99tyBrbeqLhXkVhJHEZShBy2JHcCbcr084R0tWN5Gni6uWQ3NrXsosqgbgDU+ZNTrcYuji/qSWTNGLfC/wA/8LfIoGYtey/tMPoa4yyo69lnU+NiPUHX5iq7i+liyRtGLoWBs2h1PhSnpNxOUQx/Zzcs2U5Rcjs39KzKU26srcYRV0a9JnyyFWy3te67EHn4eVVtMRrlFrE6X8alYfiqFHSSFpJLqoUls2t8x0N2N7D1NS16Nnqnl1VgMwj3IHMM3eByrRqrkrWSU2LMZO2YkizC2g2BAtfTncXqLDG7yM7bm5JItqda7EnxrpGdDUXZslglNq3sheYBfmflWyqBsLVsRrXQQke8Qv7xt8t6mmylwxwe5EIsa5YiP8Q35+NS8Q6DYFvE9kfAa/OowxjbDsjuUW+J3Pxqaopnki9kjh4jb6VyeTXXT+t67tIym4tY+ANviNKiytc3O9Bnk7MuttiDWhNbRoWNhqTU1MEB72p7uVApAtRlpiEFYZBbUetAERTpqvrbUV2XPy29DQEIuB5jmD/tXZFQ72U9x/LwoAs1ZrFFQerM0UUUEhRRRQAUUUUAFFqKKAM2otRRQBiiiiosAoooqQCiiigDfi3RnFFVkDRqpUHKZMr696kb2tSBeAzluS+Ja/0oopqPJZc0pzcmPo+GHsqvbbnobt5AV2l4TiHQhVZFVgCzER5W0tfMb8xy51iihQjyR6adULeM8GxER6x3UsXKlka7BwA1jYCxtXDD9IcXFp1mdSLWkAa/r73zrFFRKKsaMnRGHFFJ7UWXyY2+Y0ro+NUC4S/m1x8gKKKEy5ZZva38zhJjGI0OUHkoC/TWoZPOiii2xSXBGXsFUsTyUXPyreThmT35VU/or943kcvZB9azRVLk3PSasWOMo6mbK8QBCoXP6Up28kXS/mTSmeEXCqCT8fhaiirIqhMyWnZE/B4cILkdv6eVbML1minMZzkA5j1HKuTG3Mkd439e8UUUEmMoOxB8Nj8KlQwkj+dFFKy/BiWSVM//2Q==",
  },
];

const Home = () => {

  const { getUser } = useGlobalContext();

  useEffect(() => {
    getUser();
  }, []);
  return (
    <Layout>
      <Navbar />

      <div className="tertiary_bg ml-2 px-4 py-4 home ">
        <div className="flex justify-between mb-4 pt-4 items-center">
          <span className="text-xl font-bold hover:underline cursor-pointer">
            Focus
          </span>
          <span>Show All</span>
        </div>
        <div className="grid  gap-6 grid-cols-5">
          {songs.map((song, i) => {
            return <Card key={song.id} idx={i} song={song} />;
          })}
        </div>
        <div className="flex justify-between my-4 items-center">
          <span className="text-xl font-bold hover:underline cursor-pointer">
            Spotify List
          </span>
          <span>Show All</span>
        </div>
        <div className="grid  gap-6 grid-cols-5">
          {songs.map((song, i) => {
            return <Card key={song.id} idx={i} song={song} />;
          })}
        </div>
      </div>
      <Footer/>
      <SongBar />
    </Layout>
  );
};

export default Home;