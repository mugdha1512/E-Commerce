package com.mp.Ecommerce_Backend.controller;

import com.mp.Ecommerce_Backend.exception.OrderException;
import com.mp.Ecommerce_Backend.model.Order;
import com.mp.Ecommerce_Backend.response.ApiResponse;
import com.mp.Ecommerce_Backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/")
    public ResponseEntity<List<Order>> getAllOrdersHandler() {
        List<Order> orders = orderService.getAllOrders();
        return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);
    }

    @PutMapping("/{orderId}/confirmed")
    public ResponseEntity<Order> ConfirmedOrderHandler(@PathVariable Long orderId,
                                                       @RequestHeader("Authorization") String jwt) throws OrderException {
        Order order = orderService.confirmedOrder(orderId);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @PutMapping("/{orderId}/ship")
    public ResponseEntity<Order> ShippedOrderHandler(@PathVariable Long orderId,
                                                     @RequestHeader("Authorization") String jwt) throws OrderException {
        Order order = orderService.shippedOrder(orderId);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @PutMapping("/{orderId}/deliver")
    public ResponseEntity<Order> DeliverOrderHandler(@PathVariable Long orderId,
                                                     @RequestHeader("Authorization") String jwt) throws OrderException {
        Order order = orderService.deliveredOrder(orderId);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<Order> CancelOrderHandler(@PathVariable Long orderId,
                                                    @RequestHeader("Authorization") String jwt) throws OrderException {
        Order order = orderService.canceledOrder(orderId);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @DeleteMapping("/{orderId}/delete")
    public ResponseEntity<ApiResponse> DeleteOrderHandler(@PathVariable Long orderId,
                                                          @RequestHeader("Authorization") String jwt) throws OrderException {
        orderService.deleteOrder(orderId);

        ApiResponse res = new ApiResponse();
        res.setMessage("Order Deleted Successfully");
        res.setStatus(true);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
