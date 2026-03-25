# Registration Methods

ChoLib provides four ways to register items for shift activation. Each serves different use cases.

## Register by Item

Register a single item instance:

```java
ChoLibAPI.registerItem(
    "mymod",
    Items.DIAMOND_SWORD,
    ShiftHand.MAIN_HAND,
    (player, stack, hand) -> {
        return ActionResult.SUCCESS;
    }
);
```

The handler receives the player, the item stack, and the vanilla `Hand` (either `Hand.MAIN_HAND` or `Hand.OFF_HAND`).

## Register by Tag

Register all items in a tag:

```java
ChoLibAPI.registerTag(
    "mymod",
    ItemTags.SWORDS,
    ShiftHand.MAIN_HAND,
    (player, stack, hand) -> {
        return ActionResult.SUCCESS;
    }
);
```

## Register by Class

Register all instances of a specific item class:

```java
ChoLibAPI.registerItemClass(
    "mymod",
    MyCustomSwordItem.class,
    ShiftHand.OFF_HAND,
    (player, stack, hand) -> {
        return ActionResult.SUCCESS;
    }
);
```

## Register with Predicate

For complex conditions, use a predicate:

```java
ChoLibAPI.registerPredicate(
    "mymod",
    stack -> stack.isOf(Items.DIAMOND_SWORD)
             && stack.getOrDefault(NbtComponent.SWORD_RARITY, 0) >= 5,
    ShiftHand.MAIN_HAND,
    (player, stack, hand) -> {
        return ActionResult.SUCCESS;
    }
);
```

## The modId Parameter

The first parameter is your mod's ID. This keeps your registrations separate from other mods using ChoLib. Use the same modId for all registrations belonging to your mod.

## Priority

When multiple registrations could match, priority is:

1. Item (highest)
2. Tag
3. Class
4. Predicate (lowest)

Hand checking always prioritizes main hand first.

## Handler Return Value

- `ActionResult.SUCCESS` - activation succeeded, cooldown begins
- `ActionResult.PASS` - activation did nothing, but the press sequence continues
- `ActionResult.FAIL` - cancels the press sequence entirely, resets progress