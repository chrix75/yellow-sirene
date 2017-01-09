package com.datachemistry.controllers

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

/**
 * Created by csperandio on 09/01/2017.
 */
@Controller
class SearchController {
    @RequestMapping("/")
    String home() {
        'search'
    }
}
