package com.mp.Ecommerce_Backend.service;

import com.mp.Ecommerce_Backend.exception.ProductException;
import com.mp.Ecommerce_Backend.model.Category;
import com.mp.Ecommerce_Backend.model.Product;
import com.mp.Ecommerce_Backend.repository.CategoryRepository;
import com.mp.Ecommerce_Backend.repository.ProductRepository;
import com.mp.Ecommerce_Backend.request.CreateProductRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final UserService userService;
    private final CategoryRepository categoryRepository;

    public ProductServiceImpl(ProductRepository productRepository,
                              UserService userService,
                              CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.userService = userService;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Product createProduct(Product product) {
        Category toAssign = null;
        if (product.getCategory() != null) {
            String lookupName = product.getCategory().getParentCategory() != null
                    ? product.getCategory().getParentCategory().getName()
                    : product.getCategory().getName();
            Category existingTop = categoryRepository.findByName(lookupName);
            if (existingTop == null) {
                Category topLevelCategory = new Category();
                topLevelCategory.setName(product.getCategory().getName());
                topLevelCategory.setLevel(1);
                existingTop = categoryRepository.save(topLevelCategory);
            }
            toAssign = product.getCategory() != null ? product.getCategory() : existingTop;
            product.setCategory(toAssign);
        }
        product.setCreatedAt(LocalDateTime.now());
        return productRepository.save(product);
    }

    @Override
    public Product createProduct(CreateProductRequest request) {
        Product product = new Product();
        product.setTitle(request.getTitle());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setDiscountedPrice(request.getDiscountedPrice());
        product.setDiscountPercent(request.getDiscountPercent());
        product.setQuantity(request.getQuantity());
        product.setBrand(request.getBrand());
        product.setColor(request.getColor());
        product.setImageUrl(request.getImageUrl());

        Category topLevel = null;
        if (request.getTopLevelCategory() != null && !request.getTopLevelCategory().isBlank()) {
            topLevel = categoryRepository.findByName(request.getTopLevelCategory());
            if (topLevel == null) {
                topLevel = new Category();
                topLevel.setName(request.getTopLevelCategory());
                topLevel.setLevel(1);
                topLevel = categoryRepository.save(topLevel);
            }

            Category secondLevel = null;
            if (request.getSecondLevelCategory() != null && !request.getSecondLevelCategory().isBlank()) {
                secondLevel = categoryRepository.findByName(request.getSecondLevelCategory());
                if (secondLevel == null) {
                    secondLevel = new Category();
                    secondLevel.setName(request.getSecondLevelCategory());
                    secondLevel.setParentCategory(topLevel);
                    secondLevel.setLevel(2);
                    secondLevel = categoryRepository.save(secondLevel);
                }

                Category thirdLevel = null;
                if (request.getThirdLevelCategory() != null && !request.getThirdLevelCategory().isBlank()) {
                    thirdLevel = categoryRepository.findByName(request.getThirdLevelCategory());
                    if (thirdLevel == null) {
                        thirdLevel = new Category();
                        thirdLevel.setName(request.getThirdLevelCategory());
                        thirdLevel.setParentCategory(secondLevel != null ? secondLevel : topLevel);
                        thirdLevel.setLevel(3);
                        thirdLevel = categoryRepository.save(thirdLevel);
                    }
                    product.setCategory(thirdLevel);
                } else {
                    product.setCategory(secondLevel);
                }
            } else {
                product.setCategory(topLevel);
            }
        }

        product.setCreatedAt(LocalDateTime.now());
        return productRepository.save(product);
    }

    @Override
    public String deleteProduct(Long productId) throws ProductException {
        Product product = findProductById(productId);
        productRepository.delete(product);
        return "Product deleted successfully";
    }

    @Override
    public Product updateProduct(Long productId, Product req) throws ProductException {
        Product product = findProductById(productId);
        if (req.getQuantity() > 0) product.setQuantity(req.getQuantity());
        if (req.getPrice() > 0) product.setPrice(req.getPrice());
        if (req.getDiscountPercent() != null && req.getDiscountPercent() >= 0) product.setDiscountPercent(req.getDiscountPercent());
        if (req.getDiscountedPrice() >= 0) product.setDiscountedPrice(req.getDiscountedPrice());
        if (req.getTitle() != null) product.setTitle(req.getTitle());
        if (req.getDescription() != null) product.setDescription(req.getDescription());
        if (req.getBrand() != null) product.setBrand(req.getBrand());
        if (req.getColor() != null) product.setColor(req.getColor());
        if (req.getImageUrl() != null) product.setImageUrl(req.getImageUrl());
        if (req.getCategory() != null) product.setCategory(req.getCategory());
        return productRepository.save(product);
    }

    @Override
    public Product findProductById(Long id) throws ProductException {
        return productRepository.findById(id).orElseThrow(() -> new ProductException("Product not found with id - " + id));
    }

    @Override
    public List<Product> findProductByCategory(String category) {
        return productRepository.findAll().stream()
                .filter(p -> p.getCategory() != null && p.getCategory().getName() != null
                        && p.getCategory().getName().equalsIgnoreCase(category))
                .collect(Collectors.toList());
    }

    @Override
    public Page<Product> getAllProduct(
            String category,
            List<String> colors,
            List<String> sizes,
            Integer minPrice,
            Integer maxPrice,
            Integer minDiscount,
            String sort,
            String stock,
            Integer pageNumber,
            Integer pageSize) {

        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        List<String> filteredColors = (colors == null || colors.isEmpty() || colors.stream().allMatch(String::isBlank))
                ? null : colors.stream().map(String::toLowerCase).map(String::trim).collect(Collectors.toList());

        List<String> filteredSizes = (sizes == null || sizes.isEmpty() || sizes.stream().allMatch(String::isBlank))
                ? null : sizes.stream().map(String::toLowerCase).map(String::trim).collect(Collectors.toList());

        if (category != null && category.isBlank()) category = null;

        List<Product> products = productRepository.filterProducts(
                category,
                minPrice,
                maxPrice,
                minDiscount,
                sort,
                filteredColors,
                filteredSizes);

        if (stock != null && !stock.isBlank()) {
            if (stock.equalsIgnoreCase("in_stock")) {
                products = products.stream()
                        .filter(p -> p.getQuantity() > 0)
                        .collect(Collectors.toList());
            } else if (stock.equalsIgnoreCase("out_of_stock")) {
                products = products.stream()
                        .filter(p -> p.getQuantity() < 1)
                        .collect(Collectors.toList());
            }
        }

        int startIndex = (int) pageable.getOffset();
        int endIndex = Math.min(startIndex + pageable.getPageSize(), products.size());
        if (startIndex > endIndex) startIndex = 0;

        List<Product> pageContent = products.subList(startIndex, endIndex);

        return new PageImpl<>(pageContent, pageable, products.size());
    }

    @Override
    public List<Product> findAllProducts() {
        return productRepository.findAll();
    }
}
