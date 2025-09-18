module admin::automated_savings {
    use std::signer;
    use std::error;
    use std::option::{Self, Option};
    use aptos_framework::timestamp;

    const E_INSUFFICIENT_BALANCE: u64 = 1;
    const E_NOT_ADMIN: u64 = 2;

    struct SavingsAccount has key, store {
        owner: address,
        balance_units: u64, // accounting units; integrate real coin escrow later
        yield_accrued_units: u64,
        last_yield_ts: u64,
    }

    struct Admin has key { addr: address }

    public entry fun init_admin(admin_signer: &signer) {
        move_to(admin_signer, Admin { addr: signer::address_of(admin_signer) });
    }

    public entry fun create_account(user: &signer) {
        let addr = signer::address_of(user);
        if (!exists<SavingsAccount>(addr)) {
            move_to(user, SavingsAccount { owner: addr, balance_units: 0, yield_accrued_units: 0, last_yield_ts: timestamp::now_seconds() });
        }
    }

    public entry fun deposit_units(user: &signer, amount_units: u64) acquires SavingsAccount {
        let account = borrow_global_mut<SavingsAccount>(signer::address_of(user));
        account.balance_units = account.balance_units + amount_units;
    }

    public entry fun withdraw_units(user: &signer, amount_units: u64) acquires SavingsAccount {
        let account = borrow_global_mut<SavingsAccount>(signer::address_of(user));
        if (account.balance_units < amount_units) {
            abort E_INSUFFICIENT_BALANCE
        };
        account.balance_units = account.balance_units - amount_units;
    }

    public entry fun credit_yield_units(admin_signer: &signer, user_addr: address, yield_units: u64) acquires SavingsAccount, Admin {
        assert!(is_admin(admin_signer), error::permission_denied(E_NOT_ADMIN));
        let account = borrow_global_mut<SavingsAccount>(user_addr);
        account.yield_accrued_units = account.yield_accrued_units + yield_units;
        account.balance_units = account.balance_units + yield_units;
        account.last_yield_ts = timestamp::now_seconds();
    }

    public fun get_account(user_addr: address): Option<SavingsAccount> acquires SavingsAccount {
        if (exists<SavingsAccount>(user_addr)) {
            let acc = borrow_global<SavingsAccount>(user_addr);
            Option::some(copy acc)
        } else {
            Option::none<SavingsAccount>()
        }
    }

    fun is_admin(s: &signer): bool acquires Admin {
        let addr = signer::address_of(s);
        exists<Admin>(addr)
    }
}


